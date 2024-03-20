package com.inverbautista.isc.ticket;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.io.Serializable;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class  TicketId implements Serializable {


    private Long number;

    @Enumerated(EnumType.STRING)
    private TicketCity city;
    private Long raffleId;

    public static TicketId stringToTicketId(String stringTicketId) {
        String[] parts = new String[3];
        Pattern pattern = Pattern.compile("^(\\d+)([A-Za-z])(\\d+)$");
        Matcher matcher = pattern.matcher(stringTicketId);

        if (matcher.find()) {
            parts[0] = matcher.group(1);
            parts[1] = matcher.group(2);
            parts[2] = matcher.group(3);

            // Verificación de los grupos de captura (para depuración)
            System.out.println("Parte 1: " + parts[0]);
            System.out.println("Parte 2: " + parts[1]);
            System.out.println("Parte 3: " + parts[2]);

            try {
                long numericPart1 = Long.parseLong(parts[0]);
                long numericPart2 = Long.parseLong(parts[2]);

                // Supongo que TicketCity.fromCityLetter(parts[1]) es una función válida
                return new TicketId(numericPart1, TicketCity.fromCityLetter(parts[1]), numericPart2);
            } catch (NumberFormatException e) {
                // Manejar el caso cuando los valores numéricos no son válidos
                System.err.println("Error al convertir valores numéricos.");
            }
        } else {
            // Manejar el caso cuando el formato de entrada no coincide
            System.err.println("Formato de entrada incorrecto.");
        }

        return null;
    }



    @Override
    public String toString(){
        return this.getNumber()+this.getCity().getCityLetter()+this.getRaffleId();
    }


}
