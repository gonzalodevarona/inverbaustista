package com.inverbautista.isc.sale;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.inverbautista.isc.client.Client;
import com.inverbautista.isc.ticket.Ticket;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "SALE")
public class Sale {
    @Id
    private String paymentRef;


    @ManyToOne
    @JsonBackReference(value="client")
    @JoinColumn(name="idNumber")
    private Client client;

    private Double amount;

    private LocalDateTime date;

    @ToString.Exclude
    @JsonManagedReference(value="tickets")
    @OneToMany(mappedBy = "sale")
    private List<Ticket> tickets;
}
