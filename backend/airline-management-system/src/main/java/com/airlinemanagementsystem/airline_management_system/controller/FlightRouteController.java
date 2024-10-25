package com.airlinemanagementsystem.airline_management_system.controller;

import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import com.airlinemanagementsystem.airline_management_system.service.FlightRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flight-routes")
public class FlightRouteController {

    @Autowired
    private FlightRouteService flightRouteService;

    @GetMapping
    public List<FlightRoute> getAllFlightRoutes() {
        return flightRouteService.getAllFlightRoutes();
    }

    @GetMapping("/{id}")
    public FlightRoute getFlightRouteById(@PathVariable Long id) {
        return flightRouteService.getFlightRouteById(id);
    }
}
