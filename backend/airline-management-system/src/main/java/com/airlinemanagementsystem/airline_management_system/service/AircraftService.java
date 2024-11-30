package com.airlinemanagementsystem.airline_management_system.service;

import com.airlinemanagementsystem.airline_management_system.model.Aircraft;
import com.airlinemanagementsystem.airline_management_system.repository.AircraftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AircraftService {

    @Autowired
    private AircraftRepository aircraftRepository;

    // Save or update Aircraft
    public Aircraft saveAircraft(Aircraft aircraft) {
        return aircraftRepository.save(aircraft);
    }

    // Get all Aircrafts
    public List<Aircraft> getAllAircrafts() {
        return aircraftRepository.findAll();
    }

    // Get an Aircraft by ID
    public Optional<Aircraft> getAircraftById(Long id) {
        return aircraftRepository.findById(id);
    }

    // Delete an Aircraft by ID
    public void deleteAircraft(Long id) {
        aircraftRepository.deleteById(id);
    }
}
