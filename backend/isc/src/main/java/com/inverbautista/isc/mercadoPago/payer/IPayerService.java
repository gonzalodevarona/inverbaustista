package com.inverbautista.isc.mercadoPago.payer;

import com.mercadopago.client.preference.PreferencePayerRequest;
import com.mercadopago.resources.payment.PaymentAdditionalInfoPayer;
import org.springframework.stereotype.Service;

import java.util.Map;


public interface IPayerService {
    PreferencePayerRequest setupPayer(PayerDto payerDto);
    PayerDto buildPayerFromResponse(Map<String, Object> metadata, PaymentAdditionalInfoPayer additionalInfoPayer);
}
