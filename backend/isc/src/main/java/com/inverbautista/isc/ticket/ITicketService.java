package com.inverbautista.isc.ticket;

import com.inverbautista.isc.exception.BusinessLogicException;
import com.inverbautista.isc.exception.PurchaseException;
import com.inverbautista.isc.raffle.Raffle;

import java.util.List;

public interface ITicketService {

    TicketDto getTicketById(String ticketId) throws BusinessLogicException;

    List<TicketDto> getTicketsByRaffleId(Long raffleId) throws BusinessLogicException;

    List<TicketDto> getTicketsFilteredByRaffleIdAndTicketStatus(Long raffleId, String status) throws BusinessLogicException;

    List<TicketDto> getAvailableTicketsAndDelete(Long raffleId) throws BusinessLogicException;

    Integer countAllTicketsByRaffleId(Long raffleId) throws BusinessLogicException;


    List<TicketDto> buyTickets(Long raffleId, Integer quantity) throws BusinessLogicException, PurchaseException;

    Ticket addTicket(TicketDto ticket);

    String[] processTickets(String tickets);

    List<TicketDto> addTickets(String raffleName, TicketStringDto tickets) throws BusinessLogicException;

    TicketDto editTicketStatus(TicketDto ticketDto, String ticketStatusString) throws BusinessLogicException;

    TicketDto editTicket(Ticket ticket) throws BusinessLogicException;
    List<TicketDto> deleteTickets(String raffleName, TicketStringDto tickets) throws BusinessLogicException;
    List<TicketDto> deleteTicketsByStatus(String ticketStatus);

    void deleteTicketById(String ticketId) throws BusinessLogicException;

    TicketDto convertTicketToDto(Ticket ticket);

    Ticket convertDtoToTicket(TicketDto ticketDto);

    List<TicketDto> convertTicketsToDto(List<Ticket> tickets);

    List<Ticket> convertDtosToTickets(List<TicketDto> ticketsDto);
}
