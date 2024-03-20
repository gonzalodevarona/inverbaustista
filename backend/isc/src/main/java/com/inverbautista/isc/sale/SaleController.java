package com.inverbautista.isc.sale;

import com.inverbautista.isc.exception.BusinessLogicException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sale${adminPrefix}")
public class SaleController {


    private ISaleService saleService;

    public SaleController(ISaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<List<SaleDto>> getSalesByClientId(@PathVariable("clientId") Long clientId) throws BusinessLogicException {
        return new ResponseEntity<List<SaleDto>>(saleService.getSalesByClientId(clientId), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<SaleDto> addSale(@RequestBody SaleDto sale) throws BusinessLogicException {
        return new ResponseEntity<SaleDto>(saleService.addSale(sale), HttpStatus.CREATED);
    }
}
