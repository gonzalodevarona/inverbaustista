package com.inverbautista.isc.mailjet;

import com.inverbautista.isc.mercadoPago.payer.PayerDto;
import com.mercadopago.resources.payment.Payment;

import java.util.Map;

public interface IMailJetService {
    void sendSuccessfulPurchaseEmail(MailDataDto mailDataDto);
    MailDataDto buildMailDataFromResponse(Payment payment, PayerDto payerDto);
}
