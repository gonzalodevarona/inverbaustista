package com.inverbautista.isc.ticket;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class TicketDto {

    @NotBlank(message = "id shouldn't be blank")
    private String id;

    @PositiveOrZero(message = "number should be greater or equal to 0")
    private Long number;

    @NotBlank(message = "city shouldn't be blank")
    private String city;

    @NotBlank(message = "status shouldn't be blank")
    private String status;

    @PositiveOrZero(message = "raffle id should be greater or equal to 0")
    private Long raffleId;
}
