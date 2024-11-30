package com.airlinemanagementsystem.airline_management_system.controller;

import com.airlinemanagementsystem.airline_management_system.model.Aircraft;
import com.airlinemanagementsystem.airline_management_system.service.AircraftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/aircrafts")
public class AircraftController {

    @Autowired
    private AircraftService aircraftService;

    // Create a new Aircraft
    @PostMapping
    public ResponseEntity<Aircraft> createAircraft(@RequestBody Aircraft aircraft) {
        Aircraft savedAircraft = aircraftService.saveAircraft(aircraft);
        return new ResponseEntity<>(savedAircraft, HttpStatus.CREATED);
    }

    // Get a list of all Aircrafts
    @GetMapping
    public ResponseEntity<List<Aircraft>> getAllAircrafts() {
        List<Aircraft> aircraftList = aircraftService.getAllAircrafts();
        return new ResponseEntity<>(aircraftList, HttpStatus.OK);
    }

    // Get a single Aircraft by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Aircraft> getAircraftById(@PathVariable Long id) {
        Optional<Aircraft> aircraftOptional = aircraftService.getAircraftById(id);
        if (aircraftOptional.isPresent()) {
            return new ResponseEntity<>(aircraftOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update an existing Aircraft
    @PutMapping("/{id}")
    public ResponseEntity<Aircraft> updateAircraft(@PathVariable Long id, @RequestBody Aircraft aircraft) {
        Optional<Aircraft> existingAircraft = aircraftService.getAircraftById(id);
        if (existingAircraft.isPresent()) {
            aircraft.setAircraftId(id); // Ensure the ID is set for the update
            Aircraft updatedAircraft = aircraftService.saveAircraft(aircraft);
            return new ResponseEntity<>(updatedAircraft, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete an Aircraft by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAircraft(@PathVariable Long id) {
        Optional<Aircraft> aircraftOptional = aircraftService.getAircraftById(id);
        if (aircraftOptional.isPresent()) {
            aircraftService.deleteAircraft(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
