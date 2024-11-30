package com.airlinemanagementsystem.airline_management_system.controller;

import com.airlinemanagementsystem.airline_management_system.model.Airport;
import com.airlinemanagementsystem.airline_management_system.service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/airports")
public class AirportController {

    private final AirportService airportService;

    @Autowired
    public AirportController(AirportService airportService) {
        this.airportService = airportService;
    }

    // Get all airports
    @GetMapping
    public List<Airport> getAllAirports() {
        return airportService.getAllAirports();
    }

    // Get a specific airport by ID
    @GetMapping("/{id}")
    public ResponseEntity<Airport> getAirportById(@PathVariable("id") Long id) {
        Optional<Airport> airport = airportService.getAirportById(id);
        if (airport.isPresent()) {
            return ResponseEntity.ok(airport.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Create a new airport
    @PostMapping
    public ResponseEntity<Airport> createAirport(@RequestBody Airport airport) {
        Airport createdAirport = airportService.createAirport(airport);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAirport);
    }

    // Update an existing airport
    @PutMapping("/{id}")
    public ResponseEntity<Airport> updateAirport(
            @PathVariable("id") Long id,
            @RequestBody Airport airportDetails) {
        Airport updatedAirport = airportService.updateAirport(id, airportDetails);
        if (updatedAirport != null) {
            return ResponseEntity.ok(updatedAirport);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Delete an airport by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAirport(@PathVariable("id") Long id) {
        if (airportService.deleteAirport(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
