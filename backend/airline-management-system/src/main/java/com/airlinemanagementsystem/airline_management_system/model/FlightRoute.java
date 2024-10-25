package com.airlinemanagementsystem.airline_management_system.model;


import jakarta.persistence.*;

@Entity
public class FlightRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "source_airport_id")
    private Airport source;

    @ManyToOne(optional = false)
    @JoinColumn(name = "destination_airport_id")
    private Airport destination;

    private double cost;
    private double distance;
    private double time;

    // Other fields...

    // Getters and setters
    public Airport getSource() {
        return source;
    }

    public void setSource(Airport source) {
        this.source = source;
    }

    public Airport getDestination() {
        return destination;
    }

    public void setDestination(Airport destination) {
        this.destination = destination;
    }

    public double getDistance() {
        return distance;
    }

    // Other getters and setters...
}
