package com.airlinemanagementsystem.airline_management_system.service;

import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import com.airlinemanagementsystem.airline_management_system.repository.FlightRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightRouteService {

    @Autowired
    private FlightRouteRepository flightRouteRepository;

    public List<FlightRoute> getAllFlightRoutes() {
        return flightRouteRepository.findAll();
    }

    public FlightRoute getFlightRouteById(Long id) {
        return flightRouteRepository.findById(id).orElse(null);
    }
}
