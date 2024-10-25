package com.airlinemanagementsystem.airline_management_system.controller;

import com.airlinemanagementsystem.airline_management_system.model.Airport;
import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import com.airlinemanagementsystem.airline_management_system.repository.AirportRepository;
import com.airlinemanagementsystem.airline_management_system.repository.FlightRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private AirportRepository airportRepository;

    @Autowired
    private FlightRouteRepository flightRouteRepository;

    // Endpoint to test retrieving all airports
    @GetMapping("/airports")
    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }

    // Endpoint to test retrieving all flight routes
    @GetMapping("/flightroutes")
    public List<FlightRoute> getAllFlightRoutes() {
        return flightRouteRepository.findAll();
    }
}
