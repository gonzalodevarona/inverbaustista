package com.inverbautista.isc.mercadoPago.item;

import com.mercadopago.client.preference.PreferenceItemRequest;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IItemService {
    PreferenceItemRequest setupItem(ItemDto itemDto);
    List<PreferenceItemRequest> setupItems(List<ItemDto> itemsDto);
}
