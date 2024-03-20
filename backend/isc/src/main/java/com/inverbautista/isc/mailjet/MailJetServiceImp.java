package com.inverbautista.isc.mailjet;

import com.inverbautista.isc.mercadoPago.payer.PayerDto;
import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.MailjetRequest;
import com.mailjet.client.MailjetResponse;
import com.mailjet.client.resource.Emailv31;
import com.mercadopago.resources.payment.Payment;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.Map;

@Service
public class MailJetServiceImp implements IMailJetService{

    public void sendSuccessfulPurchaseEmail(MailDataDto mailDataDto) {
        try {
            MailjetClient client;
            MailjetRequest request;
            MailjetResponse response;
            client = new MailjetClient("ec500379cf77e174bc280128b387b4de", "5e5556b542b025ee36a81b02e6aca5a4", new ClientOptions("v3.1"));
            request = new MailjetRequest(Emailv31.resource)
                    .property(Emailv31.MESSAGES, new JSONArray()
                            .put(new JSONObject()
                                    .put(Emailv31.Message.FROM, new JSONObject()
                                            .put("Email", "inversionesbautistadptoti@gmail.com")
                                            .put("Name", "InverBautista SAS"))
                                    .put(Emailv31.Message.TO, new JSONArray()
                                            .put(new JSONObject()
                                                    .put("Email", mailDataDto.getEmail())
                                                    .put("Name", mailDataDto.getName())))
                                    .put(Emailv31.Message.TEMPLATEID, 5771612)
                                    .put(Emailv31.Message.TEMPLATELANGUAGE, true)
                                    .put(Emailv31.Message.SUBJECT, "Tus boletas de InverBautista")
                                    .put(Emailv31.Message.VARIABLES, new JSONObject()
                                            .put("firstname", mailDataDto.getName())
                                            .put("paymentId", mailDataDto.getPaymentId())
                                            .put("drawEvent", mailDataDto.getDrawEvent())
                                            .put("raffleName", mailDataDto.getRaffleName())
                                            .put("drawDate", mailDataDto.getDrawDate())
                                            .put("drawNumbers", mailDataDto.getDrawNumbers())
                                            .put("quantity", mailDataDto.getQuantity())
                                            .put("unitPrice", mailDataDto.getUnitPrice())
                                            .put("total", mailDataDto.getTotal())
                                            .put("currentYear", mailDataDto.getCurrentYear()))));
            response = client.post(request);
            System.out.println(response.getStatus());
            System.out.println(response.getData());
        } catch (Exception e){
            System.out.println(e);
        }
    }

    public MailDataDto buildMailDataFromResponse(Payment payment, PayerDto payerDto){
        return new MailDataDto(
                payerDto.getEmail(),
                payerDto.getName(),
                payerDto.getSurname(),
                payment.getDescription().split(":")[1].trim(),
                payment.getId().toString(),
                (String)payment.getMetadata().get("draw_event"),
                (String)payment.getMetadata().get("draw_date"),
                "",
                payment.getAdditionalInfo().getItems().get(0).getQuantity(),
                payment.getAdditionalInfo().getItems().get(0).getUnitPrice().toString(),
                payment.getTransactionAmount().toString(),
                Year.now().toString()
        );
    }
}
