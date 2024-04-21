package com.inverbautista.isc.mercadoPago;
import com.inverbautista.isc.client.Client;
import com.inverbautista.isc.client.IClientService;
import com.inverbautista.isc.exception.BusinessLogicException;
import com.inverbautista.isc.exception.PurchaseException;
import com.inverbautista.isc.mailjet.IMailJetService;
import com.inverbautista.isc.mailjet.MailDataDto;
import com.inverbautista.isc.mercadoPago.dto.MercadoPagoRequestDto;
import com.inverbautista.isc.mercadoPago.dto.MercadoPagoResponseDto;
import com.inverbautista.isc.mercadoPago.item.IItemService;
import com.inverbautista.isc.mercadoPago.payer.IPayerService;
import com.inverbautista.isc.mercadoPago.payer.PayerDto;
import com.inverbautista.isc.sale.ISaleService;
import com.inverbautista.isc.sale.SaleDto;
import com.inverbautista.isc.ticket.ITicketService;
import com.inverbautista.isc.ticket.TicketDto;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.*;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.resources.preference.Preference;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MercadoPagoServiceImp implements IMercadoPagoService{

    @Value("${mercadopago.accessToken}")
    private String accessToken;

    @Value("${shop.url}")
    private String shopUrl;
    private IPayerService payerService;
    private IItemService itemService;
    private IClientService clientService;
    private ITicketService ticketService;
    private ISaleService saleService;
    private IMailJetService mailJetService;

    public MercadoPagoServiceImp(IPayerService payerService, IItemService itemService, IClientService clientService, ITicketService ticketService, ISaleService saleService, IMailJetService mailJetService) {
        this.payerService = payerService;
        this.itemService = itemService;
        this.clientService = clientService;
        this.ticketService = ticketService;
        this.saleService = saleService;
        this.mailJetService = mailJetService;
    }

    @Override
    public MercadoPagoResponseDto generatePreference(MercadoPagoRequestDto mercadoPagoRequestDto){
            try {

                MercadoPagoConfig.setAccessToken(accessToken);

                // Payment restrictions

                List<PreferencePaymentMethodRequest> excludedPaymentMethods = new ArrayList<>();
                excludedPaymentMethods.add(PreferencePaymentMethodRequest.builder().id("amex").build());
                excludedPaymentMethods.add(PreferencePaymentMethodRequest.builder().id("diners").build());

                List<PreferencePaymentTypeRequest> excludedPaymentTypes = new ArrayList<>();
                excludedPaymentTypes.add(PreferencePaymentTypeRequest.builder().id("ticket").build());
                excludedPaymentTypes.add(PreferencePaymentTypeRequest.builder().id("voucher_card").build());
                excludedPaymentTypes.add(PreferencePaymentTypeRequest.builder().id("crypto_transfer").build());
                excludedPaymentTypes.add(PreferencePaymentTypeRequest.builder().id("atm").build());

                PreferencePaymentMethodsRequest paymentMethods =
                        PreferencePaymentMethodsRequest.builder()
                                .excludedPaymentMethods(excludedPaymentMethods)
                                .excludedPaymentTypes(excludedPaymentTypes)
                                .build();

                // BackUrls

                PreferenceBackUrlsRequest backUrls =  PreferenceBackUrlsRequest.builder()
                                .success(shopUrl+"/pay/result")
                                .failure(shopUrl+"/pay/result")
                                .build();

                PreferencePayerRequest payer = payerService.setupPayer(mercadoPagoRequestDto.getPayerDto());
                PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                        // Appending the items
                        .items(itemService.setupItems(mercadoPagoRequestDto.getItemsDto()))
                        // Setting up payer info
                        .payer(payer)
                        .paymentMethods(paymentMethods)
                        .backUrls(backUrls)
                        .notificationUrl(shopUrl+":8443/api/pay/notify")
                        .metadata(new HashMap<>() {{
                            put("email", payer.getEmail());
                            put("idNumber", payer.getIdentification().getNumber());
                            put("idType", payer.getIdentification().getType());
                            put("phone", payer.getPhone().getNumber());
                            put("country", payer.getPhone().getAreaCode());
                            put("drawDate", mercadoPagoRequestDto.getItemsDto().get(0).getDrawDate());
                            put("drawEvent", mercadoPagoRequestDto.getItemsDto().get(0).getDrawEvent());
                            put("raffleId", mercadoPagoRequestDto.getItemsDto().get(0).getRaffleId());
                        }})
                        .binaryMode(true)
                        .build();

                PreferenceClient client = new PreferenceClient();

                Preference preference = client.create(preferenceRequest);

                return new MercadoPagoResponseDto(preference.getId(), preference.getInitPoint(), preference.getSandboxInitPoint(), preference.getExternalReference(), preference.getItems() );

            } catch (Exception e){
                System.out.println(e);
            }
            return null;
    }

    @Override
    @Transactional
    public void processNotification(Map<String, Object> bodyReceivedMap ){

        String actionData = (String) bodyReceivedMap.get("action");
        //  When payment is updated it might be because it was approved
        if(actionData!= null &&     actionData.equalsIgnoreCase("payment.updated")) {
            try {
                Map<String, String> paymentData = (Map<String, String>) bodyReceivedMap.get("data");
                String paymentId = paymentData.get("id");
                Payment payment = getPayment(Long.valueOf(paymentId));

                //  Check if payment was approved and accredited
                if(payment.getStatus().equalsIgnoreCase("approved") &&
                payment.getStatusDetail().equalsIgnoreCase("accredited")) {
                    Map<String, Object> payerInfo = payment.getMetadata();

                    // Build payer info
                    PayerDto payer = payerService.buildPayerFromResponse(payment.getMetadata(), payment.getAdditionalInfo().getPayer());

                    // Build email info
                    MailDataDto mailDataDto = mailJetService.buildMailDataFromResponse(payment, payer);

                    Client client = clientService.addClientFromPayer(payer);

                    //  Get paid tickets and change it's state from AVAILABLE to SOLD
                    List<TicketDto> boughtTickets = ticketService.buyTickets( Double.valueOf(payerInfo.get("raffle_id").toString()).longValue(), mailDataDto.getQuantity());
                    String tickets = "";
                    for (TicketDto ticket: boughtTickets) {
                        tickets += String.valueOf(ticket.getNumber()) + ticket.getCity().charAt(0);
                        tickets += "-";
                    }
                    // Append ticket data to email info
                    mailDataDto.setDrawNumbers(tickets.substring(0,tickets.length()-1));

                    // Build sale
                    SaleDto newSale = new SaleDto();
                    newSale.setClientIdNumber(client.getIdNumber());
                    newSale.setClientIdType(client.getIdType());
                    newSale.setAmount(payment.getTransactionAmount().doubleValue());
                    newSale.setPaymentRef(paymentId);
                    newSale.setDate(payment.getDateApproved().toLocalDateTime());
                    newSale.setTickets(boughtTickets);

                    // Add Sale to DB
                    saleService.addSale(newSale);

                    // Send payment confirmation email
                    mailJetService.sendSuccessfulPurchaseEmail(mailDataDto);


                    System.out.println("Success: payment was successful!");
                }else{
                    System.out.println("Dismiss: payment was declined");
                }

            } catch (NullPointerException e) {
                System.out.println("Dismiss: no payment data here");
            } catch (PurchaseException e) {
                System.out.println(e);
                throw new RuntimeException(e);
            } catch (BusinessLogicException e) {
                System.out.println(e);
                throw new RuntimeException(e);
            }
        } else{
            System.out.println("Dismiss: no payment yet");
        }

    }

    @Override
    public Payment getPayment(Long paymentID) {
        PaymentClient client = new PaymentClient();
        Payment payment;
        try {
            payment = client.get(paymentID);
            return payment;
        } catch (MPException e) {
            System.out.println("error :" + e.getMessage());
        } catch (MPApiException api) {
            System.out.println("api error :");
            System.out.println(api.getApiResponse().getContent());
        }
        return null;
    }

}
