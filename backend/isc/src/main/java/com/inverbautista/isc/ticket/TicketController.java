package com.inverbautista.isc.ticket;

import com.inverbautista.isc.exception.BusinessLogicException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ticket")
public class TicketController {


    private ITicketService ticketService;
    private ITicketAvailablityService ticketAvailablity;

    public TicketController(ITicketService ticketService, ITicketAvailablityService ticketAvailablity) {
        this.ticketService = ticketService;
        this.ticketAvailablity = ticketAvailablity;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketDto> getTicketById(@PathVariable("id") String ticketId) throws BusinessLogicException {
        return ResponseEntity.ok(ticketService.getTicketById(ticketId));
    }

    @GetMapping("/{raffleId}/all")
    public ResponseEntity<List<TicketDto>> getTicketsByRaffleId(@PathVariable("raffleId") Long raffleId) throws BusinessLogicException {
        return ResponseEntity.ok(ticketService.getTicketsByRaffleId(raffleId));
    }

    @GetMapping("${adminPrefix}/raffleid/{raffleId}")
    public ResponseEntity<List<TicketDto>> getTicketsFilteredByRaffleIdAndTicketStatus(@PathVariable("raffleId") Long raffleId, @RequestParam(value = "status", defaultValue = "AVAILABLE") String status) throws BusinessLogicException {
        return ResponseEntity.ok(ticketService.getTicketsFilteredByRaffleIdAndTicketStatus(raffleId, status));
    }

    @GetMapping("${adminPrefix}/raffleid/{raffleId}/sold")
    public ResponseEntity<List<TicketSoldDto>> getSoldTicketsByRaffleId(@PathVariable("raffleId") Long raffleId) throws BusinessLogicException {
        return ResponseEntity.ok(ticketService.getSoldTicketsByRaffleId(raffleId));
    }

    @DeleteMapping("${adminPrefix}/available/{raffleId}")
    public ResponseEntity<List<TicketDto>> getAvailableTicketsAndDelete(@PathVariable("raffleId") Long raffleId) throws BusinessLogicException {
        return ResponseEntity.ok(ticketService.getAvailableTicketsAndDelete(raffleId));
    }

    @GetMapping("/{raffleId}/checkAvailability")
    public ResponseEntity<Boolean> checkAvailabilityForTickets(@PathVariable("raffleId") Long raffleId, @RequestParam(value = "quantity", defaultValue = "1") Integer quantity) throws BusinessLogicException {
        return ResponseEntity.ok(ticketAvailablity.checkAvailabilityForTickets(raffleId, quantity));
    }

    @GetMapping("${adminPrefix}/{raffleId}/count/all")
    public ResponseEntity<Integer> countAllTicketsByRaffleId(@PathVariable("raffleId") Long raffleId) throws BusinessLogicException {
        return ResponseEntity.ok(ticketService.countAllTicketsByRaffleId(raffleId));
    }


    @GetMapping("${adminPrefix}/{raffleId}/count")
    public ResponseEntity<Integer> countTicketsFilteredByRaffleIdAndTicketStatus(@PathVariable("raffleId") Long raffleId, @RequestParam(value = "status", defaultValue = "AVAILABLE") String status) throws BusinessLogicException {
        return ResponseEntity.ok(ticketAvailablity.countTicketsFilteredByRaffleIdAndTicketStatus(raffleId, status));
    }


    @PostMapping("${adminPrefix}/add")
    public ResponseEntity<List<TicketDto>> addTickets(@RequestParam(value = "raffle") String raffle, @RequestBody TicketStringDto tickets) throws BusinessLogicException {
        return new ResponseEntity<List<TicketDto>>(ticketService.addTickets(raffle, tickets), HttpStatus.CREATED);
    }

    @DeleteMapping("${adminPrefix}/delete")
    public ResponseEntity<List<TicketDto>> deleteTickets(@RequestParam(value = "raffle") String raffle, @RequestBody TicketStringDto tickets) throws BusinessLogicException {
        return new ResponseEntity<List<TicketDto>>(ticketService.deleteTickets(raffle, tickets), HttpStatus.OK);
    }

    @DeleteMapping("${adminPrefix}/delete/{status}")
    public ResponseEntity<List<TicketDto>> deleteTicketsByStatus(@PathVariable("status") String status){
        return new ResponseEntity<List<TicketDto>>(ticketService.deleteTicketsByStatus(status), HttpStatus.OK);
    }


    @PostMapping("${adminPrefix}")
    public ResponseEntity<Ticket> addTicket(@Valid @RequestBody  TicketDto ticket) {
        return new ResponseEntity<Ticket>(ticketService.addTicket(ticket), HttpStatus.CREATED);
    }


    @DeleteMapping("${adminPrefix}/{id}")
    public ResponseEntity deleteTicketById(@PathVariable("id") String ticketId) throws BusinessLogicException {
        ticketService.deleteTicketById(ticketId);
        return  ResponseEntity.ok("Erased ticket with id "+ ticketId);
    }


} //end of class

