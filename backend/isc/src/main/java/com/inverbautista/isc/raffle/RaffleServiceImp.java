package com.inverbautista.isc.raffle;

import com.inverbautista.isc.exception.BusinessLogicException;
import com.inverbautista.isc.ticket.ITicketAvailablityService;
import jakarta.transaction.Transactional;
import lombok.SneakyThrows;
import org.mapstruct.factory.Mappers;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;
import java.util.stream.Collectors;

@Service
public class RaffleServiceImp implements IRaffleService{

    static RaffleMapper raffleMapper = Mappers.getMapper(RaffleMapper.class);


    private ITicketAvailablityService ticketAvailablity;


    private RaffleRepository raffleRepository;


    private TaskScheduler scheduler;

    public RaffleServiceImp(ITicketAvailablityService ticketAvailablity, RaffleRepository raffleRepository, TaskScheduler scheduler) {
        this.ticketAvailablity = ticketAvailablity;
        this.raffleRepository = raffleRepository;
        this.scheduler = scheduler;
    }

    @Override
    @Transactional
    public void completeRaffle(Raffle raffle) throws BusinessLogicException{
        Runnable runnable = new Runnable() {
            private long id = raffle.getId();
            @SneakyThrows
            public void run(){
                changeRaffleStatus(id, RaffleStatus.COMPLETED.name());
            }
        };

        ScheduledFuture<?> scheduledFuture = scheduler.schedule(runnable, raffle.getDrawDate().toInstant(ZoneOffset.UTC));

        //some code
    }



    @Override
    public List<RaffleDto> getAllRaffles(boolean includeTickets){
        return convertRafflesToDtos(raffleRepository.findAll(), includeTickets);
    }
    @Override
    public List<RaffleDto> getAllRafflesFiltered(boolean includeTickets, String status) throws RuntimeException{
        RaffleStatus raffleStatusCasted = RaffleStatus.castEnum(status);
        return convertRafflesToDtos(raffleRepository.findByStatus(raffleStatusCasted), includeTickets);
    }

    @Override
    public List<RaffleDto> getSellableRaffles(){
        List<RaffleDto> raffleDtos = new ArrayList<RaffleDto>();
        raffleDtos.addAll(getAllRafflesFiltered(false, RaffleStatus.ACTIVE.name()));
        raffleDtos.addAll(getAllRafflesFiltered(false, RaffleStatus.SOLDOUT.name()));

        return raffleDtos;
    }

    @Override
    @Transactional
    public Raffle addRaffle(RaffleDto raffleDto) throws BusinessLogicException {
        Raffle raffle = raffleRepository.save(raffleMapper.toRaffle(raffleDto));
        completeRaffle(raffle);
        return raffle;
    }

    @Override
    public RaffleDto getRaffleById(Long raffleId, boolean tickets) throws BusinessLogicException{

        Raffle raffle = raffleRepository.findById(raffleId).orElseThrow(() -> new BusinessLogicException("raffle not found with id : " + raffleId));

        return convertRaffleToDto(raffle, tickets);
    }

    @Override
    public Raffle getRaffleEntityById(Long raffleId) throws BusinessLogicException{

        Raffle raffle = raffleRepository.findById(raffleId).orElseThrow(() -> new BusinessLogicException("raffle not found with id : " + raffleId));

        return raffle;
    }

    @Override
    public List<RaffleDto> getActiveRafflesWithAvailableTickets() throws BusinessLogicException{
        List<RaffleDto> raffles = getAllRafflesFiltered(false, RaffleStatus.ACTIVE.name());
        List<RaffleDto> rafflesWithAvailability = new ArrayList<>();

        for (RaffleDto raffle: raffles) {
            if (ticketAvailablity.checkAvailabilityForTickets(raffle.getId(), 1)){
                rafflesWithAvailability.add(raffle);
            }
        }
        return rafflesWithAvailability;
    }

    @Override
    public Long processRaffleId(String raffleId){
        String[] raffleArr = raffleId.split("\\.");

        return Long.parseLong(raffleArr[0]);
    }

    @Override
    @Transactional
    public RaffleDto editRaffle(Long raffleId, RaffleDto raffleDto) throws BusinessLogicException{
        Raffle raffle = getRaffleEntityById(raffleId);

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

    @Override
    public RaffleDto saveRaffle(Raffle raffle) {
        return convertRaffleToDto(raffleRepository.save(raffle), false);
    }

    @Override
    @Transactional
    public RaffleDto changeRaffleStatus(Long raffleId, String status) throws BusinessLogicException, RuntimeException{
        Raffle raffle = getRaffleEntityById(raffleId);
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

    @Override
    public RaffleStatus getRaffleStatus(Long raffleId) throws BusinessLogicException{
        Raffle raffle = getRaffleEntityById(raffleId);
        return raffle.getStatus();
    }


    @Override
    @Transactional
    public void deleteRaffleById(Long raffleId) throws BusinessLogicException{

        raffleRepository.findById(raffleId).orElseThrow(() -> new BusinessLogicException("raffle not found with id : " + raffleId));

        raffleRepository.deleteById(raffleId);

    }

    @Override
    public List<RaffleDto> convertRafflesToDtos(List<Raffle> raffles, boolean includeTickets) {
        return raffles.stream()
                .map(raffle -> {
                    RaffleDto raffleDto = convertRaffleToDto(raffle, includeTickets);
                    return raffleDto;
                })
                .collect(Collectors.toList());
    }
    @Override
    public RaffleDto convertRaffleToDto(Raffle raffle, boolean includeTickets) {

        RaffleDto raffleDto = raffleMapper.fromRaffle(raffle);
        if (includeTickets) {
            raffleDto.setTickets(raffle.getTickets());
        }
        return raffleDto;
    }



} //end of class
