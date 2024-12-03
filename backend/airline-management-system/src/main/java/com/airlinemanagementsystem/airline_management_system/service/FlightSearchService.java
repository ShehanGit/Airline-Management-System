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
        logger.info("Searching for flights with parameters - From: {}, To: {}", from, to);

        List<FlightRoute> allFlights = flightRouteRepository.findAll();
        logger.info("Total flights in database: {}", allFlights.size());

        List<FlightRoute> matchedFlights = allFlights.stream()
                .filter(flight -> {
                    // Log debug information about each flight
                    logger.debug("Checking flight - Source: {}, Destination: {}",
                            flight.getSource().getName(),
                            flight.getDestination().getName());

                    boolean fromMatch = flight.getSource().getName().equalsIgnoreCase(from) ||
                            flight.getSource().getAirportCode().equalsIgnoreCase(from);
                    boolean toMatch = flight.getDestination().getName().equalsIgnoreCase(to) ||
                            flight.getDestination().getAirportCode().equalsIgnoreCase(to);

                    if (fromMatch && toMatch) {
                        logger.info("Found matching flight: Source = {}, Destination = {}",
                                flight.getSource().getName(),
                                flight.getDestination().getName());
                    }

                    return fromMatch && toMatch;
                })
                .collect(Collectors.toList());

        logger.info("Found {} matching flights", matchedFlights.size());
        return matchedFlights;
    }
}