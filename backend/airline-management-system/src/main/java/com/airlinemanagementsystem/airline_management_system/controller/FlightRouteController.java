package com.airlinemanagementsystem.airline_management_system.controller;

import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import com.airlinemanagementsystem.airline_management_system.model.WeightType;
import com.airlinemanagementsystem.airline_management_system.service.FlightRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/routes")
public class FlightRouteController {
    @Autowired
    private FlightRouteService flightRouteService;

    @GetMapping("/shortest")
    public List<Long> getShortestRoute(
            @RequestParam Long startId,
            @RequestParam Long endId,
            @RequestParam(defaultValue = "DISTANCE") String weightType) {

        WeightType wt = WeightType.fromString(weightType);
        return flightRouteService.getShortestRoute(startId, endId, wt);
    }

    // Get all flight routes
    @GetMapping
    public List<FlightRoute> getAllFlightRoutes() {
        return flightRouteService.getAllFlightRoutes();
    }

    // Get a flight route by ID
    @GetMapping("/{id}")
    public ResponseEntity<FlightRoute> getFlightRouteById(@PathVariable("id") Long id) {
        Optional<FlightRoute> flightRoute = flightRouteService.getFlightRouteById(id);
        return flightRoute.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new flight route
    @PostMapping
    public ResponseEntity<FlightRoute> createFlightRoute(@RequestBody FlightRoute flightRoute) {
        FlightRoute createdFlightRoute = flightRouteService.createFlightRoute(flightRoute);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFlightRoute);
    }

    // Update an existing flight route
    @PutMapping("/{id}")
    public ResponseEntity<FlightRoute> updateFlightRoute(@PathVariable("id") Long id, @RequestBody FlightRoute flightRouteDetails) {
        FlightRoute updatedFlightRoute = flightRouteService.updateFlightRoute(id, flightRouteDetails);
        if (updatedFlightRoute != null) {
            return ResponseEntity.ok(updatedFlightRoute);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete a flight route by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlightRoute(@PathVariable("id") Long id) {
        if (flightRouteService.deleteFlightRoute(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}