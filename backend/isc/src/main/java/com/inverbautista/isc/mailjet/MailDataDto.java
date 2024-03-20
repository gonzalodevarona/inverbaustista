package com.inverbautista.isc.mailjet;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class MailDataDto {

    @NotBlank(message = "email shouldn't be blank")
    private String email;
    @NotBlank(message = "name shouldn't be blank")
    private String name;
    @NotBlank(message = "surname shouldn't be blank")
    private String surname;
    @NotBlank(message = "raffleName shouldn't be blank")
    private String raffleName;
    @NotBlank(message = "paymentId shouldn't be blank")
    private String paymentId;
    @NotBlank(message = "drawEvent shouldn't be blank")
    private String drawEvent;
    @Positive(message = "drawDate should be greater or equal to 1")
    private String drawDate;
    @NotBlank(message = "drawNumbers shouldn't be blank")
    private String drawNumbers;
    @Positive(message = "quantity should be greater or equal to 1")
    private int quantity;
    @NotBlank(message = "unitPrice shouldn't be blank")
    private String unitPrice;
    @NotBlank(message = "total shouldn't be blank")
    private String total;
    @NotBlank(message = "currentYear shouldn't be blank")
    private String currentYear;
}
