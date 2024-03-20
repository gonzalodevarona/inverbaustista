package com.inverbautista.isc.raffle;

import com.inverbautista.isc.file.FileEntity;
import com.inverbautista.isc.ticket.Ticket;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class RaffleDto {
    private Long id;

    @NotBlank(message = "name shouldn't be blank")
    private String name;

    private String description;

    @NotNull(message = "price per ticket shouldn't be null")
    @Positive(message = "price per ticket should be greater than zero")
    private Double pricePerTicket;

    @Min(value = 0, message = "discount should not be less than 0")
    @Max(value = 100, message = "discount should not be greater than 100")
    private Integer discount;

    @NotNull(message = "status shouldn't be null")
    private RaffleStatus status;

    @Future(message = "draw date should be in the future")
    private LocalDateTime drawDate;

    @NotBlank(message = "draw event shouldn't be blank")
    private String drawEvent;

    @NotNull(message = "tickets list shouldn't be null")
    private List<Ticket> tickets;

    @NotNull(message = "images list shouldn't be null")
    private List<FileEntity> images;
}