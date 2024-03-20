package com.inverbautista.isc.mercadoPago.item;

import com.mercadopago.client.preference.PreferenceItemRequest;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImp implements IItemService{

    public final static String CURRENCY_COP = "COP";
    public final static String CATEGORY_TICKETS = "tickets";

    public PreferenceItemRequest setupItem(ItemDto itemDto){
        return PreferenceItemRequest.builder()
                        .title(itemDto.getTitle())
                        .description(itemDto.getDescription())
                        .pictureUrl(itemDto.getPictureUrl())
                        .categoryId(CATEGORY_TICKETS)
                        .quantity(itemDto.getQuantity())
                        .currencyId(CURRENCY_COP)
                        .unitPrice(itemDto.getUnitPrice())
                        .build();
    }

    public List<PreferenceItemRequest> setupItems(List<ItemDto> itemsDto){
        List<PreferenceItemRequest> items = new ArrayList<>();

        for (ItemDto item: itemsDto) {
            items.add(setupItem(item));
        }

        return items;
    }



}
