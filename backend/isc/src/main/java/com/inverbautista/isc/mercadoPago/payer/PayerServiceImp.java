package com.inverbautista.isc.mercadoPago.payer;

import com.mercadopago.client.common.AddressRequest;
import com.mercadopago.client.common.IdentificationRequest;
import com.mercadopago.client.common.PhoneRequest;
import com.mercadopago.client.preference.PreferencePayerRequest;
import com.mercadopago.resources.payment.PaymentAdditionalInfoPayer;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PayerServiceImp implements IPayerService{

    public PreferencePayerRequest setupPayer(PayerDto payerDto){
        return PreferencePayerRequest.builder()
                .name(payerDto.getName())
                .surname(payerDto.getSurname())
                .email(payerDto.getEmail())
                .phone(
                        PhoneRequest.builder()
                                .areaCode(payerDto.getCountry())
                                .number(payerDto.getPhone())
                                .build()
                        )
                .identification(
                        IdentificationRequest.builder()
                                .type(payerDto.getIdType())
                                .number(payerDto.getIdNumber())
                                .build()
                        )
                .address(
                        AddressRequest.builder()
                                .streetName(payerDto.getAddress()).
                                build()
                )
                .build();
    }

    public PayerDto buildPayerFromResponse(Map<String, Object> metadata, PaymentAdditionalInfoPayer additionalInfoPayer){

        return new PayerDto(
                    additionalInfoPayer.getFirstName(),
                    additionalInfoPayer.getLastName(),
                    (String) metadata.get("phone"),
                    (String) metadata.get("country"),
                    additionalInfoPayer.getAddress().getStreetName(),
                    (String) metadata.get("email"),
                    (String) metadata.get("id_type"),
                    (String) metadata.get("id_number")
                );
    }
}
