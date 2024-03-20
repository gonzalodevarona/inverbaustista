package com.inverbautista.isc.ticket;

import com.inverbautista.isc.exception.BusinessLogicException;
import com.inverbautista.isc.raffle.RaffleDto;

public interface ITicketAvailablityService {
    Boolean checkAvailabilityForTickets(Long raffleId, Integer quantity) throws BusinessLogicException;
    Integer countTicketsFilteredByRaffleIdAndTicketStatus(Long raffleId, String status) throws BusinessLogicException;
    RaffleDto changeRaffleStatus(Long raffleId, String status) throws BusinessLogicException, RuntimeException;
    RaffleDto editRaffle(Long raffleId, RaffleDto raffleDto) throws BusinessLogicException;
}
