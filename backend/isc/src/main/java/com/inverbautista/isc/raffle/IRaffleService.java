package com.inverbautista.isc.raffle;

import com.inverbautista.isc.exception.BusinessLogicException;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IRaffleService {
    void completeRaffle(Raffle raffle) throws BusinessLogicException;

    List<RaffleDto> getAllRafflesFiltered(boolean includeTickets, String status);
    List<RaffleDto> getAllRaffles(boolean includeTickets);

    List<RaffleDto> getSellableRaffles();
    RaffleDto getRaffleById(Long raffleId, boolean tickets) throws BusinessLogicException;
    Raffle getRaffleEntityById(Long raffleId) throws BusinessLogicException;
    List<RaffleDto> getActiveRafflesWithAvailableTickets() throws BusinessLogicException;
    Raffle addRaffle(RaffleDto raffleDto) throws BusinessLogicException;
    RaffleDto editRaffle(Long raffleId, RaffleDto raffle) throws BusinessLogicException;

    Long processRaffleId(String raffleId);
    RaffleDto saveRaffle(Raffle raffle);
    RaffleDto changeRaffleStatus(Long raffleId, String status) throws BusinessLogicException, RuntimeException;
    RaffleStatus getRaffleStatus(Long raffleId) throws BusinessLogicException;
    void deleteRaffleById(Long raffleId) throws BusinessLogicException;
    List<RaffleDto> convertRafflesToDtos(List<Raffle> raffles, boolean includeTickets);
    RaffleDto convertRaffleToDto(Raffle raffle, boolean includeTickets);

}
