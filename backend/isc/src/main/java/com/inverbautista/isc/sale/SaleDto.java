package com.inverbautista.isc.sale;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.inverbautista.isc.client.Client;
import com.inverbautista.isc.ticket.Ticket;
import com.inverbautista.isc.ticket.TicketDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class SaleDto {

    @NotBlank(message = "payment ref shouldn't be blank")
    private String paymentRef;

    @NotBlank(message = "client id type shouldn't be blank")
    private String clientIdType;

    @Positive(message = "client id number should be greater than zero")
    private Long clientIdNumber;
    @Positive(message = "amount should be greater than zero")
    private Double amount;

    @NotNull(message = "date shouldn't be null")
    private LocalDateTime date;

    @NotEmpty(message = "tickets cannot be empty.")
    private List<TicketDto> tickets;
}
