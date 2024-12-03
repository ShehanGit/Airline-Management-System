package com.airlinemanagementsystem.airline_management_system.service;

import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import com.airlinemanagementsystem.airline_management_system.repository.FlightRouteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightSearchService {

    private static final Logger logger = LoggerFactory.getLogger(FlightSearchService.class);
    private final FlightRouteRepository flightRouteRepository;

    @Autowired
    public FlightSearchService(FlightRouteRepository flightRouteRepository) {
        this.flightRouteRepository = flightRouteRepository;
    }

    public List<FlightRoute> searchFlights(
            String from,
            String to,
            Integer passengers,
            String flightClass
    ) {
        List<FlightRoute> allFlights = flightRouteRepository.findAll();

        return allFlights.stream()
                .filter(flight -> {
                    String sourceName = flight.getSource().getName().toLowerCase();
                    String sourceCode = flight.getSource().getAirportCode().toLowerCase();
                    String destName = flight.getDestination().getName().toLowerCase();
                    String destCode = flight.getDestination().getAirportCode().toLowerCase();

                    String fromSearch = from.toLowerCase();
                    String toSearch = to.toLowerCase();

                    // Check for code match first
                    boolean fromMatch = sourceCode.equals(fromSearch);
                    boolean toMatch = destCode.equals(toSearch);

                    // If code doesn't match, try partial name match
                    if (!fromMatch) {
                        fromMatch = sourceName.contains(fromSearch) ||
                                fromSearch.contains(sourceName);
                    }
                    if (!toMatch) {
                        toMatch = destName.contains(toSearch) ||
                                toSearch.contains(destName);
                    }

                    return fromMatch && toMatch;
                })
                .collect(Collectors.toList());
    }
}