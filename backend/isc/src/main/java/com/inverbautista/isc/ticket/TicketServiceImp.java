package com.inverbautista.isc.ticket;

import com.inverbautista.isc.client.ClientDto;
import com.inverbautista.isc.client.ClientMapper;
import com.inverbautista.isc.exception.BusinessLogicException;
import com.inverbautista.isc.exception.PurchaseException;
import com.inverbautista.isc.raffle.IRaffleService;
import com.inverbautista.isc.raffle.Raffle;
import com.inverbautista.isc.raffle.RaffleDto;
import com.inverbautista.isc.raffle.RaffleStatus;
import jakarta.transaction.Transactional;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class TicketServiceImp implements ITicketService {

    static TicketMapper ticketMapper = Mappers.getMapper(TicketMapper.class);
    static ClientMapper clientMapper = Mappers.getMapper(ClientMapper.class);


    private TicketRepository ticketRepository;

    private IRaffleService raffleService;
    private ITicketAvailablityService ticketAvailablityService;

    public TicketServiceImp(TicketRepository ticketRepository, IRaffleService raffleService, ITicketAvailablityService ticketAvailablityService) {
        this.ticketRepository = ticketRepository;
        this.raffleService = raffleService;
        this.ticketAvailablityService = ticketAvailablityService;
    }

    @Override
    public TicketDto getTicketById(String ticketId) throws BusinessLogicException {
        Ticket ticket = ticketRepository.findById(TicketId.stringToTicketId(ticketId)).orElseThrow(() -> new BusinessLogicException("ticket not found with id : " + ticketId));
        return convertTicketToDto(ticket);
    }

    @Override
    public List<TicketDto> getTicketsByRaffleId(Long raffleId) throws BusinessLogicException {
        RaffleDto raffle = raffleService.getRaffleById(raffleId, true);
        return convertTicketsToDto(raffle.getTickets());
    }

    @Override
    public List<TicketDto> getTicketsFilteredByRaffleIdAndTicketStatus(Long raffleId, String status) throws BusinessLogicException {
        List<Ticket> tickets = ticketRepository.findByRaffleIdAndStatus(raffleId, TicketStatus.castEnum(status));
        return convertTicketsToDto(tickets);
    }

    @Override
    public List<TicketSoldDto> getSoldTicketsByRaffleId(Long raffleId) throws BusinessLogicException {
        List<Ticket> tickets = ticketRepository.findByRaffleIdAndStatus(raffleId, TicketStatus.SOLD);
        List<TicketSoldDto> ticketSoldDtos = new ArrayList<TicketSoldDto>();
        for (Ticket ticket: tickets) {

            if(ticket.getSale() != null && ticket.getSale().getClient() != null){
                TicketDto ticketDto = convertTicketToDto(ticket);
                ClientDto clientDto =  clientMapper.fromClient(ticket.getSale().getClient());
                TicketSoldDto soldTicket = new TicketSoldDto(ticketDto, clientDto);
                ticketSoldDtos.add(soldTicket);
            }
        }

        return ticketSoldDtos;
    }

    @Override
    @Transactional
    public List<TicketDto> getAvailableTicketsAndDelete(Long raffleId) throws BusinessLogicException {
        List<TicketDto> availableTickets = getTicketsFilteredByRaffleIdAndTicketStatus(raffleId, TicketStatus.AVAILABLE.name());
        for (TicketDto ticket: availableTickets) {
            deleteTicketById(""+ticket.getNumber()+ticket.getCity().charAt(0)+ticket.getRaffleId());
        }
        return availableTickets;
    }

    @Override
    @Transactional
    public List<TicketDto> buyTickets(Long raffleId, Integer quantity) throws BusinessLogicException, PurchaseException {
        if (ticketAvailablityService.checkAvailabilityForTickets(raffleId, quantity) == false){
            throw new PurchaseException("Raffle with Raffle ID "+raffleId+" is sold out");
        }

        List<TicketDto> tickets = getTicketsFilteredByRaffleIdAndTicketStatus(raffleId, TicketStatus.AVAILABLE.name());

        Collections.shuffle(tickets, new Random());

        List<TicketDto> firstNTickets = tickets.stream().limit(quantity).collect(Collectors.toList());

        for(TicketDto ticketDto :firstNTickets) {
            TicketDto updatedTicket = editTicketStatus(ticketDto, TicketStatus.SOLD.name());
            ticketDto.setStatus(updatedTicket.getStatus());
        }

        return firstNTickets;

    }


    @Override
    public Integer countAllTicketsByRaffleId(Long raffleId) throws BusinessLogicException{
        Integer ticketNumber = ticketRepository.countByRaffleId(raffleId);
        return ticketNumber;
    }



    @Override
    public Ticket addTicket(TicketDto ticketDto){

        Ticket ticket = ticketMapper.toTicket(ticketDto);
        if(ticketRepository.findById(ticket.getId()).isPresent()){
            return null;
        };
        return ticketRepository.save(ticket);
    }


    @Override
    public String[] processTickets(String tickets){
        tickets = tickets.toUpperCase();

        tickets = tickets.replaceAll("\\s+","");

        String[] ticketsArr;

        if(tickets.contains("-")){
        ticketsArr = tickets.split("-");
        } else{
            ticketsArr = new String[]{tickets};
        }

        return ticketsArr;

    }



    @Override
    @Transactional
    public List<TicketDto> addTickets(String raffleName, TicketStringDto tickets) throws BusinessLogicException{

        Long raffleId = raffleService.processRaffleId(raffleName);

        Raffle raffle = raffleService.getRaffleEntityById(raffleId);

        if(raffle.getStatus() == RaffleStatus.SOLDOUT){
            raffle.setStatus(RaffleStatus.ACTIVE);
        }

        String[] ticketsArr = processTickets(tickets.getTickets());

        List<TicketDto> ticketList = new ArrayList<TicketDto>();

        for(String ticket : ticketsArr) {
            char lastChar = ticket.charAt(ticket.length() - 1);

            String numberPart = ticket.substring(0, ticket.length() - 1);
            String letterPart = String.valueOf(lastChar);

            Ticket newTicket = new Ticket();

            TicketId newTicketId = new TicketId();


            newTicketId.setNumber(Long.parseLong(numberPart));
            newTicketId.setCity(TicketCity.fromCityLetter(letterPart));
            newTicketId.setRaffleId(raffle.getId());

            newTicket.setId(newTicketId);
            newTicket.setRaffle(raffle);
            newTicket.setStatus(TicketStatus.AVAILABLE);

            if(ticketRepository.findById(newTicket.getId()).isEmpty()){
                raffle.getTickets().add(newTicket);
                ticketList.add(convertTicketToDto(newTicket));
                ticketRepository.save(newTicket);
            };




        }

        raffleService.saveRaffle(raffle);


        return ticketList;
    }


    @Override
    @Transactional
    public TicketDto editTicketStatus(TicketDto ticketDto, String ticketStatusString) throws BusinessLogicException{

        TicketStatus ticketStatus = TicketStatus.castEnum(ticketStatusString);
        Ticket ticket = ticketRepository.findById(
                new TicketId(
                        ticketDto.getNumber(),
                        TicketCity.valueOf(ticketDto.getCity()),
                        ticketDto.getRaffleId()
                )).orElseThrow(() -> new BusinessLogicException("ticket not found with id : " + ticketDto.getId()));
        ticket.setStatus(ticketStatus);
        return convertTicketToDto(ticketRepository.save(ticket));
    }

    @Override
    @Transactional
    public TicketDto editTicket(Ticket ticket) throws BusinessLogicException{
        Ticket ticketFound = ticketRepository.findById(ticket.getId()).orElseThrow(() -> new BusinessLogicException("ticket not found with id : " + ticket.getId().toString()));
        ticketFound.setSale(ticket.getSale());
        ticketFound.setStatus(ticket.getStatus());

        return convertTicketToDto(ticketRepository.save(ticketFound));
    }

    @Override
    @Transactional
    public void deleteTicketById(String ticketId) throws BusinessLogicException{
        ticketRepository.findById(TicketId.stringToTicketId(ticketId)).orElseThrow(() -> new BusinessLogicException("ticket not found with id : " + ticketId));
        ticketRepository.deleteById(TicketId.stringToTicketId(ticketId));
    }


    @Override
    @Transactional
    public List<TicketDto> deleteTickets(String raffleName, TicketStringDto tickets) throws BusinessLogicException{
        Long raffleId = raffleService.processRaffleId(raffleName);

        Raffle raffle = raffleService.getRaffleEntityById(raffleId);

        String[] ticketsArr = processTickets(tickets.getTickets());

        List<TicketDto> ticketList = new ArrayList<TicketDto>();

        for(String ticket : ticketsArr) {
            try{
                ticket = ticket + raffle.getId();
                TicketDto foundTicket = getTicketById(ticket);

                if (!(foundTicket.getStatus().equalsIgnoreCase(TicketStatus.SOLD.name()))){
                    ticketList.add(foundTicket);
                    deleteTicketById(ticket);
                }

            }catch (BusinessLogicException e){
                System.out.println(e);
            }

        }




        return ticketList;
    }
    @Override
    @Transactional
    public List<TicketDto> deleteTicketsByStatus(String ticketStatus){
        List<Ticket> deletedTickets = ticketRepository.deleteByStatus(TicketStatus.castEnum(ticketStatus));
        return convertTicketsToDto(deletedTickets);
    }


    @Override
    public TicketDto convertTicketToDto(Ticket ticket) {
        return ticketMapper.fromTicket(ticket);
    }

    @Override
    public Ticket convertDtoToTicket(TicketDto ticketDto) {
        return ticketMapper.toTicket(ticketDto);
    }

    @Override
    public List<TicketDto> convertTicketsToDto(List<Ticket> tickets) {

        return tickets.stream()
                .map(ticket -> {
                    TicketDto ticketDto = convertTicketToDto(ticket);
                    return ticketDto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<Ticket> convertDtosToTickets(List<TicketDto> ticketsDto) {

        return ticketsDto.stream()
                .map(ticketDto -> {
                    Ticket ticket = convertDtoToTicket(ticketDto);
                    return ticket;
                })
                .collect(Collectors.toList());
    }


}  //end of class
