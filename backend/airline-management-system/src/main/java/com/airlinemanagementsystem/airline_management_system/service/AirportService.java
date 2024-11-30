package com.airlinemanagementsystem.airline_management_system.service;

import com.airlinemanagementsystem.airline_management_system.model.Airport;
import com.airlinemanagementsystem.airline_management_system.repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirportService {

    private final AirportRepository airportRepository;

    @Autowired
    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    // Create a new airport
    public Airport createAirport(Airport airport) {
        return airportRepository.save(airport);
    }

    // Get all airports
    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }

    // Get an airport by its ID
    public Optional<Airport> getAirportById(Long id) {
        return airportRepository.findById(id);
    }

    // Update an existing airport
    public Airport updateAirport(Long id, Airport airportDetails) {
        Optional<Airport> airportOptional = airportRepository.findById(id);
        if (airportOptional.isPresent()) {
            Airport airport = airportOptional.get();
            airport.setName(airportDetails.getName());
            airport.setAirportCode(airportDetails.getAirportCode());
            airport.setCity(airportDetails.getCity());
            airport.setCountry(airportDetails.getCountry());
            airport.setLatitude(airportDetails.getLatitude());
            airport.setLongitude(airportDetails.getLongitude());
            airport.setTimezone(airportDetails.getTimezone());
            airport.setTerminalCount(airportDetails.getTerminalCount());
            airport.setInternational(airportDetails.isInternational());

            return airportRepository.save(airport);
        }
        return null;  // Could throw an exception here if the airport doesn't exist
    }

    // Delete an airport by its ID
    public boolean deleteAirport(Long id) {
        if (airportRepository.existsById(id)) {
            airportRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
