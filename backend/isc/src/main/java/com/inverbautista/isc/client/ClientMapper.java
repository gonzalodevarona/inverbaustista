package com.inverbautista.isc.client;

import com.inverbautista.isc.raffle.Raffle;
import com.inverbautista.isc.raffle.RaffleDto;
import com.inverbautista.isc.raffle.RaffleMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper( componentModel = "spring")
public interface ClientMapper {

    ClientMapper INSTANCE = Mappers.getMapper( ClientMapper.class );

    @Mapping(target = "sales", expression = "java(new java.util.ArrayList<com.inverbautista.isc.sale.Sale>())")
    ClientDto fromClient(Client client);

    @Mapping(target = "sales", expression = "java(new java.util.ArrayList<com.inverbautista.isc.sale.Sale>())")
    Client toClient(ClientDto clientDto);
}
