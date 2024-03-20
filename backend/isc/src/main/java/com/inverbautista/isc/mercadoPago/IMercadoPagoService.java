package com.inverbautista.isc.mercadoPago;

import com.inverbautista.isc.mercadoPago.dto.MercadoPagoRequestDto;
import com.inverbautista.isc.mercadoPago.dto.MercadoPagoResponseDto;
import com.mercadopago.resources.payment.Payment;

import java.util.Map;

public interface IMercadoPagoService {

    MercadoPagoResponseDto generatePreference(MercadoPagoRequestDto mercadoPagoRequestDto);
    void processNotification(Map<String, Object> bodyReceivedMap );
    Payment getPayment(Long paymentID);
}
