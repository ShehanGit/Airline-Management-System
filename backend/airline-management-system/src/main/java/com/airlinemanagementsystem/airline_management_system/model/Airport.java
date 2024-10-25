package com.airlinemanagementsystem.airline_management_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String code;  // e.g., "JFK"
    private String city;
    private String country;
    private double latitude;
    private double longitude;
    private String timezone;
    private int runwayCapacity;  // Number of available runways
    private boolean isInternational;  // True for international airports

    // Constructors
    public Airport() {}

    public Airport(String name, String code, String city, String country, double latitude, double longitude, String timezone, int runwayCapacity, boolean isInternational) {
        this.name = name;
        this.code = code;
        this.city = city;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.timezone = timezone;
        this.runwayCapacity = runwayCapacity;
        this.isInternational = isInternational;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public int getRunwayCapacity() {
        return runwayCapacity;
    }

    public void setRunwayCapacity(int runwayCapacity) {
        this.runwayCapacity = runwayCapacity;
    }

    public boolean isInternational() {
        return isInternational;
    }

    public void setInternational(boolean international) {
        isInternational = international;
    }
}
