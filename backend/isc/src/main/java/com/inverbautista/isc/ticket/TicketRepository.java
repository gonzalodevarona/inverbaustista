package com.inverbautista.isc.ticket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, TicketId> {

    List<Ticket> findByRaffleIdAndStatus(Long raffleId,TicketStatus ticketStatus);
    List<Ticket> deleteByStatus(TicketStatus ticketStatus);
    Integer countByRaffleIdAndStatus(Long raffleId,TicketStatus ticketStatus);

    Integer countByRaffleId(Long raffleId);

}



