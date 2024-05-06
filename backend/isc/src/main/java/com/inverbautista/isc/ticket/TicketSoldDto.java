package com.inverbautista.isc.ticket;

import com.inverbautista.isc.client.ClientDto;
import lombok.*;

@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class TicketSoldDto {


    private TicketDto ticketDto;
    private ClientDto clientDto;
}
