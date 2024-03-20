package com.inverbautista.isc.sale;

import com.inverbautista.isc.client.Client;
import com.inverbautista.isc.client.ClientDto;
import com.inverbautista.isc.client.IClientService;
import com.inverbautista.isc.exception.BusinessLogicException;
import com.inverbautista.isc.raffle.IRaffleService;
import com.inverbautista.isc.ticket.*;
import jakarta.transaction.Transactional;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SaleServiceImp implements ISaleService{

    static SaleMapper saleMapper = Mappers.getMapper(SaleMapper.class);


    private SaleRepository saleRepository;


    private IClientService clientService;


    private ITicketService ticketService;

    public SaleServiceImp(SaleRepository saleRepository, IClientService clientService, ITicketService ticketService) {
        this.saleRepository = saleRepository;
        this.clientService = clientService;
        this.ticketService = ticketService;
    }

    @Override
    public List<SaleDto> getSalesByClientId(Long clientId) throws BusinessLogicException {
        return convertSalesToDtos(saleRepository.findByClient_IdNumberOrderByDateDesc(clientId));
    }

    @Override
    @Transactional
    public SaleDto addSale(SaleDto sale) throws BusinessLogicException {
        Client client = clientService.getClientEntityById(sale.getClientIdNumber(), true);

        List<Ticket> ticketsSold = ticketService.convertDtosToTickets(sale.getTickets());

        Sale newSale = new Sale();
        newSale.setPaymentRef(sale.getPaymentRef());
        newSale.setDate(sale.getDate());
        newSale.setAmount(sale.getAmount());
        newSale.setClient(client);
        newSale.setTickets(ticketsSold);

        Sale saleToReturn = saleRepository.save(newSale);


        client.getSales().add(saleToReturn);
        clientService.saveClient(client);

        for (Ticket ticketSold : ticketsSold) {
            ticketSold.setSale(saleToReturn);
            ticketSold.setStatus(TicketStatus.SOLD);
            ticketService.editTicket(ticketSold);
        }

        return convertSaleToDto(saleToReturn);
    }

    @Override
    public SaleDto convertSaleToDto(Sale sale) {
        SaleDto saleDto = saleMapper.fromSale(sale);

        return saleDto;
    }

    @Override
    public List<SaleDto> convertSalesToDtos(List<Sale> sales) {

        return sales.stream()
                .map(sale -> {
                    SaleDto saleDto = convertSaleToDto(sale);
                    return saleDto;
                })
                .collect(Collectors.toList());
    }

}
