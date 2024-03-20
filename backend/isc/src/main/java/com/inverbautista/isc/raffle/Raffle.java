package com.inverbautista.isc.raffle;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.inverbautista.isc.file.FileEntity;

import com.inverbautista.isc.ticket.Ticket;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Getter
@Setter
@Table(name = "RAFFLE")
public class Raffle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double pricePerTicket;

    private Integer discount;

    private LocalDateTime drawDate;

    private String drawEvent;

    @Enumerated(EnumType.STRING)
    private RaffleStatus status;

    @ToString.Exclude
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference(value="raffle")
    @OneToMany(mappedBy = "raffle")
    private List<Ticket> tickets;

    @ToString.Exclude
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    @OneToMany(mappedBy = "raffle")
    private List<FileEntity> images;
}


