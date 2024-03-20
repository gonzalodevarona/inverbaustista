package com.inverbautista.isc.ticket;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper( componentModel = "spring")
public interface TicketMapper {

    TicketMapper INSTANCE = Mappers.getMapper( TicketMapper.class );

    @Mapping(source = "id.city", target = "city")
    @Mapping(source = "id.number", target = "number")
    @Mapping(source = "id.raffleId", target = "raffleId")
    @Mapping(source = "id", target = "id", qualifiedByName = "fromTicketId")
    TicketDto fromTicket(Ticket ticket);

    @InheritInverseConfiguration
    Ticket toTicket(TicketDto ticketDto);

    @Named("fromTicketId")
    public static String fromTicketId(TicketId ticketId){
        return ""+ticketId.getNumber()+ticketId.getCity()+ ticketId.getRaffleId();
    }

    @Named("toTicketId")
    public static TicketId toTicketId(TicketDto ticketDto){
        return new TicketId(ticketDto.getNumber(), TicketCity.valueOf(ticketDto.getCity()), ticketDto.getRaffleId());
    }
}



