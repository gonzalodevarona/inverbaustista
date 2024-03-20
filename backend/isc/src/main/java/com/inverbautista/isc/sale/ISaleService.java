package com.inverbautista.isc.sale;

import com.inverbautista.isc.exception.BusinessLogicException;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ISaleService {

    List<SaleDto> getSalesByClientId(Long clientId) throws BusinessLogicException;
    SaleDto addSale(SaleDto sale) throws BusinessLogicException;

    SaleDto convertSaleToDto(Sale sale);

    List<SaleDto> convertSalesToDtos(List<Sale> sales);
}
