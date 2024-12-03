package com.airlinemanagementsystem.airline_management_system.controller;

import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import com.airlinemanagementsystem.airline_management_system.service.FlightSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes/search")
@CrossOrigin(origins = "*")
public class FlightSearchController {

    private final FlightSearchService flightSearchService;

    @Autowired
    public FlightSearchController(FlightSearchService flightSearchService) {
        this.flightSearchService = flightSearchService;
    }

    @GetMapping
    public ResponseEntity<?> searchFlights(
            @RequestParam(required = true) String from,  // Changed parameter names to be simpler
            @RequestParam(required = true) String to,
            @RequestParam(required = true) Integer passengers,
            @RequestParam(required = false, defaultValue = "ECONOMY") String flightClass
    ) {
        try {
            List<FlightRoute> availableFlights = flightSearchService.searchFlights(
                    from,
                    to,
                    passengers,
                    flightClass
            );

            if (availableFlights.isEmpty()) {
                return ResponseEntity.ok()
                        .body(new SearchResponse("No flights found for the specified route", availableFlights));
            }

            return ResponseEntity.ok()
                    .body(new SearchResponse("Flights found successfully", availableFlights));

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new SearchResponse("Error searching flights: " + e.getMessage(), null));
        }
    }
}

class SearchResponse {
    private String message;
    private List<FlightRoute> flights;

    public SearchResponse(String message, List<FlightRoute> flights) {
        this.message = message;
        this.flights = flights;
    }

    // Getters
    public String getMessage() {
        return message;
    }

    public List<FlightRoute> getFlights() {
        return flights;
    }
}