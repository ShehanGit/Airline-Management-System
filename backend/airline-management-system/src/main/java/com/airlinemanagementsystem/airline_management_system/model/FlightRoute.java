package com.airlinemanagementsystem.airline_management_system.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class FlightRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "source_airport_id")
    private Airport source;

    @ManyToOne
    @JoinColumn(name = "destination_airport_id")
    private Airport destination;

    private double cost;          // Cost of the flight
    private double distance;      // Distance between source and destination
    private double time;          // Time of the flight in hours or minutes

    private String flightNumber;  // Unique flight number
    private String airline;       // The airline operating the flight
    private LocalDateTime departureTime;  // Departure time
    private LocalDateTime arrivalTime;    // Arrival time
    private int availableSeats;   // Available seats on the flight
    private String status;        // "On-Time", "Delayed", "Cancelled"
    private String planeType;     // Type of the airplane (Boeing 737, Airbus A320, etc.)
    private double baggageAllowance;  // Baggage allowance in kg

    // Getters and Setters

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

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getTime() {
        return time;
    }

    public void setTime(double time) {
        this.time = time;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPlaneType() {
        return planeType;
    }

    public void setPlaneType(String planeType) {
        this.planeType = planeType;
    }

    public double getBaggageAllowance() {
        return baggageAllowance;
    }

    public void setBaggageAllowance(double baggageAllowance) {
        this.baggageAllowance = baggageAllowance;
    }
}
