package com.inverbautista.isc.mercadoPago.payer;

import com.mercadopago.client.common.AddressRequest;
import com.mercadopago.client.common.PhoneRequest;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class PayerDto {

    @NotBlank(message = "name shouldn't be blank")
    private String name;
    @NotBlank(message = "surname shouldn't be blank")
    private String surname;
    @NotBlank(message = "phone shouldn't be blank")
    private String phone;
    @NotBlank(message = "country shouldn't be blank")
    private String country;
    @NotBlank(message = "address shouldn't be blank")
    private String address;
    @NotBlank(message = "email shouldn't be blank")
    private String email;
    @NotBlank(message = "idType shouldn't be blank")
    private String idType;
    @NotBlank(message = "idNumber shouldn't be blank")
    private String idNumber;

}
