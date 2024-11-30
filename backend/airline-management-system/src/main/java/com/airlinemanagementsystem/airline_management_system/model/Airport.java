package com.airlinemanagementsystem.airline_management_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String airportCode;  // e.g., "JFK"
    private String city;
    private String country;
    private double latitude;
    private double longitude;
    private String timezone;
    private int terminalCount;  // Number of available runways
    private boolean isInternational;  // True for international airports

    // Constructors
    public Airport() {}


    // Getters and Setters
    public Long getId() {
        return id;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Airport airport = (Airport) o;

        return id != null ? id.equals(airport.id) : airport.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
