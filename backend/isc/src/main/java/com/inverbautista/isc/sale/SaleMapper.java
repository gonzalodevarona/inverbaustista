package com.inverbautista.isc.sale;

import com.inverbautista.isc.client.Client;
import com.inverbautista.isc.client.ClientRepository;
import com.inverbautista.isc.ticket.Ticket;
import com.inverbautista.isc.ticket.TicketDto;
import com.inverbautista.isc.ticket.TicketId;
import com.inverbautista.isc.ticket.TicketMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Mapper( componentModel = "spring")
public interface SaleMapper {

    SaleMapper INSTANCE = Mappers.getMapper( SaleMapper.class );




    @Mapping(target = "clientIdType", source = "sale.client.idType")
    @Mapping(target = "clientIdNumber", source = "sale.client.idNumber")
    SaleDto fromSale(Sale sale);

    @Mapping(target = "tickets", expression = "java(new java.util.ArrayList<com.inverbautista.isc.ticket.Ticket>())")
    @Mapping(target = "client", source = "clientIdNumber",qualifiedByName = "mapClient")
    Sale toSale(SaleDto saleDto);

    default List<TicketDto> ticketsToTicketsDto(List<Ticket> tickets) {
        List<TicketDto> ticketDtos = new ArrayList<TicketDto>();
        for (Ticket ticket : tickets) {
            ticketDtos.add(Mappers.getMapper(TicketMapper.class).fromTicket(ticket));
        }
        return ticketDtos;
    }

    @Named("mapClient")
    static Client mapClient(Long clientIdNumber){
        Client client = new Client();
        client.setIdNumber(clientIdNumber);
        return client;
    }
}
