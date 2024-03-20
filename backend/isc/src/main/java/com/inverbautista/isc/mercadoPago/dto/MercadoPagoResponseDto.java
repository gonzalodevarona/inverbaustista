package com.inverbautista.isc.mercadoPago.dto;
import com.mercadopago.resources.preference.PreferenceItem;
import lombok.*;

import java.util.List;


@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class MercadoPagoResponseDto {
    private String id;
    private String initPoint;
    private String sandboxInitPoint;
    private String externalReference;
    private List<PreferenceItem> items;
}
