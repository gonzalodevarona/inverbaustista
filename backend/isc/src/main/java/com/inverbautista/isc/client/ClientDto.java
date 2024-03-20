package com.inverbautista.isc.client;

import com.inverbautista.isc.sale.Sale;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ClientDto {

    @NotBlank(message = "id type shouldn't be blank")
    private String idType;

    @Positive(message = "id number number should be greater than zero")
    private Long idNumber;

    @NotBlank(message = "name shouldn't be blank")
    private String name;

    @NotBlank(message = "last name shouldn't be blank")
    private String lastName;


    @NotBlank(message = "email shouldn't be blank")
    private String email;

    @Positive(message = "phone number should be greater than zero")
    private Long phoneNumber;

    @NotBlank(message = "country shouldn't be blank")
    private String country;

    private String state;

    @NotBlank(message = "city shouldn't be blank")
    private String city;

    private String address;

    @NotNull(message = "sales list shouldn't be null")
    private List<Sale> sales;
}



