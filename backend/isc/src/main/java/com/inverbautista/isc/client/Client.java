package com.inverbautista.isc.client;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.inverbautista.isc.sale.Sale;
import com.inverbautista.isc.ticket.Ticket;
import com.inverbautista.isc.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Data
@Entity
@Table(name = "CLIENT")
@EqualsAndHashCode(callSuper=false)
public class Client extends User {

    @Id
    private Long idNumber;

    @Column(length = 2)
    private String idType;

    @Column(name = "phoneNumber", length = 10)
    private Long phoneNumber;

    private String country;

    private String state;

    private String city;

    private String address;

    @ToString.Exclude
    @JsonManagedReference(value="client")
    @OneToMany(mappedBy = "client")
    private List<Sale> sales;
}
