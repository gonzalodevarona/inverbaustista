package com.inverbautista.isc.ticket;

import lombok.Getter;

@Getter
public enum TicketCity {
    CALI("Cali","C"), NORTEDELVALLE("Norte del Valle", "N");

    private final String cityName;
    private final String cityLetter;

    private TicketCity (String cityName, String cityLetter){
        this.cityName = cityName;
        this.cityLetter = cityLetter;
    }

    public static TicketCity fromCityLetter(String cityLetter) {
        cityLetter = cityLetter.toUpperCase();
        for (TicketCity city : values()) {
            if (city.getCityLetter().equals(cityLetter)) {
                return city;
            }
        }
        throw new IllegalArgumentException("Unknown abbreviation: " + cityLetter);
    }

}
