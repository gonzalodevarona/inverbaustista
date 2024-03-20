package com.inverbautista.isc.raffle;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper( componentModel = "spring")
public interface RaffleMapper {

    RaffleMapper INSTANCE = Mappers.getMapper( RaffleMapper.class );

    @Mapping(target = "tickets", expression = "java(new java.util.ArrayList<com.inverbautista.isc.ticket.Ticket>())")
//    @Mapping(target = "images", expression = "java(new java.util.ArrayList<com.inverbautista.isc.file.File>())")
    RaffleDto fromRaffle(Raffle raffle);

    @Mapping(target = "tickets", expression = "java(new java.util.ArrayList<com.inverbautista.isc.ticket.Ticket>())")
//    @Mapping(target = "images", expression = "java(new java.util.ArrayList<com.inverbautista.isc.file.File>())")
    Raffle toRaffle(RaffleDto raffleDto);
}


