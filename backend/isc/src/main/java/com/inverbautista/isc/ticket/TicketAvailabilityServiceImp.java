package com.inverbautista.isc.ticket;

import com.inverbautista.isc.exception.BusinessLogicException;
import com.inverbautista.isc.raffle.*;
import jakarta.transaction.Transactional;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

@Service
public class TicketAvailabilityServiceImp implements ITicketAvailablityService {

    private TicketRepository ticketRepository;
    private RaffleRepository raffleRepository;

    static RaffleMapper raffleMapper = Mappers.getMapper(RaffleMapper.class);

    public TicketAvailabilityServiceImp(TicketRepository ticketRepository, RaffleRepository raffleRepository) {
        this.ticketRepository = ticketRepository;
        this.raffleRepository = raffleRepository;
    }

    @Override
    @Transactional
    public Boolean checkAvailabilityForTickets(Long raffleId, Integer quantity) throws BusinessLogicException {
        boolean availability = true;

        Raffle raffle = raffleRepository.findById(raffleId).orElseThrow(() -> new BusinessLogicException("raffle not found with id : " + raffleId));

        if (raffle.getStatus() == RaffleStatus.SOLDOUT){
            availability = false;
        }

        Integer availableTickets = countTicketsFilteredByRaffleIdAndTicketStatus(raffleId, TicketStatus.AVAILABLE.name());

        if(availableTickets == 0){
            changeRaffleStatus(raffleId, RaffleStatus.SOLDOUT.name());
            availability = false;
        } else if (availableTickets < quantity) {
            availability = false;
        }

        return availability;
    }

    @Transactional
    @Override
    public RaffleDto changeRaffleStatus(Long raffleId, String status) throws BusinessLogicException, RuntimeException{
        Raffle raffle = raffleRepository.findById(raffleId).orElseThrow(() -> new BusinessLogicException("raffle not found with id : " + raffleId));
        RaffleStatus raffleStatusCasted = RaffleStatus.castEnum(status);


        if (raffle.getStatus() == RaffleStatus.COMPLETED){
            return convertRaffleToDto(raffle, false);
        } else{
            RaffleDto raffleDto = new RaffleDto();
            raffleDto.setId(raffle.getId());
            raffleDto.setStatus(raffleStatusCasted);

            return editRaffle(raffleId, raffleDto);
        }

    }

    @Transactional
    @Override
    public RaffleDto editRaffle(Long raffleId, RaffleDto raffleDto) throws BusinessLogicException{
        Raffle raffle = raffleRepository.findById(raffleId).orElseThrow(() -> new BusinessLogicException("raffle not found with id : " + raffleId));

        if(raffleDto.getDiscount() != null){
            raffle.setDiscount(raffleDto.getDiscount());
        }

        if(raffleDto.getDescription() != null){
            raffle.setDescription(raffleDto.getDescription());
        }

        if(raffleDto.getStatus() != null && raffle.getStatus() != RaffleStatus.COMPLETED){
            raffle.setStatus(raffleDto.getStatus());
        }

        if(raffleDto.getPricePerTicket() != null){
            raffle.setPricePerTicket(raffleDto.getPricePerTicket());
        }

        return convertRaffleToDto(raffleRepository.save(raffle), false);
    }


    public RaffleDto convertRaffleToDto(Raffle raffle, boolean includeTickets) {

        RaffleDto raffleDto = raffleMapper.fromRaffle(raffle);
        if (includeTickets) {
            raffleDto.setTickets(raffle.getTickets());
        }
        return raffleDto;
    }

    @Override
    public Integer countTicketsFilteredByRaffleIdAndTicketStatus(Long raffleId, String status) throws BusinessLogicException{
        Integer ticketNumber = ticketRepository.countByRaffleIdAndStatus(raffleId, TicketStatus.castEnum(status));
        return ticketNumber;
    }
}
