package com.inverbautista.isc.mercadoPago.dto;

import com.inverbautista.isc.mercadoPago.item.ItemDto;
import com.inverbautista.isc.mercadoPago.payer.PayerDto;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class MercadoPagoRequestDto {

    private PayerDto payerDto;
    private List<ItemDto> itemsDto;
}
