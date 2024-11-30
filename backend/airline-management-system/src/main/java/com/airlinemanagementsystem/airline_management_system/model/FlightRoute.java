package com.airlinemanagementsystem.airline_management_system.model;

import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "flight_route")
public class FlightRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "flight_number", nullable = false, unique = true)
    private String flightNumber;

    @ManyToOne(optional = false)
    @JoinColumn(name = "source_airport_id")
    private Airport source;

    @Column(name = "departure_time", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date departureTime;

    @Column(name = "arrival_time", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date arrivalTime;

    @ManyToOne(optional = false)
    @JoinColumn(name = "destination_airport_id")
    private Airport destination;

    @Column(name = "total_seats")
    private Integer totalSeats;

    @Enumerated(EnumType.STRING)
    @Column(name = "flight_status")
    private FlightStatus flightStatus;

    @ManyToOne
    @JoinColumn(name = "aircraft_id", nullable = false)
    private Aircraft aircraft;

    @Enumerated(EnumType.STRING)
    @Column(name = "flight_type", nullable = false)
    private FlightType flightType;


    private double cost;
    private double distance;
    private double time;


    // Getters
    public Long getId() {
        return id;
    }

    public Airport getSource() {
        return source;
    }

    public Airport getDestination() {
        return destination;
    }

    public double getCost() {
        return cost;
    }

    public double getDistance() {
        return distance;
    }

    public double getTime() {
        return time;
    }

    // Other methods...

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        FlightRoute that = (FlightRoute) o;

        return id != null ? id.equals(that.id) : that.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    public enum FlightStatus {
        ON_TIME, DELAYED, CANCELED
    }

    public enum FlightType {
        DOMESTIC, INTERNATIONAL
    }


}
