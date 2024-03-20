package com.inverbautista.isc.ticket;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.inverbautista.isc.raffle.Raffle;
import com.inverbautista.isc.sale.Sale;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "TICKET")
public class Ticket {

    @EmbeddedId
    private TicketId id;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    @MapsId("ID")
    @ManyToOne
    @JsonBackReference(value="raffle")
    @JoinColumn(name = "raffleId")
    private Raffle raffle;


    @ManyToOne
    @JsonBackReference(value="tickets")
    @JoinColumn(name = "saleId")
    private Sale sale;

}


