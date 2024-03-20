package com.inverbautista.isc.mercadoPago.item;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ItemDto {

    @NotBlank(message = "title shouldn't be blank")
    private String title;
    @NotBlank(message = "description shouldn't be blank")
    private String description;
    @NotBlank(message = "drawDate shouldn't be blank")
    private String drawDate;
    @NotBlank(message = "drawEvent shouldn't be blank")
    private String drawEvent;
    @NotBlank(message = "raffleId shouldn't be blank")
    private Long raffleId;
    @NotBlank(message = "pictureUrl shouldn't be blank")
    private String pictureUrl;
    @NotBlank(message = "categoryId shouldn't be blank")
    private String categoryId;
    @Positive(message = "quantity should be greater or equal to 1")
    private int quantity;
    @NotBlank(message = "currencyId shouldn't be blank")
    private String currencyId;
    @Positive(message = "unitPrice should be greater or equal to 1")
    private BigDecimal unitPrice;
}
