package com.airlinemanagementsystem.airline_management_system.service;

import com.airlinemanagementsystem.airline_management_system.model.Airport;
import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import com.airlinemanagementsystem.airline_management_system.model.WeightType;
import com.airlinemanagementsystem.airline_management_system.repository.AirportRepository;
import com.airlinemanagementsystem.airline_management_system.repository.FlightRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FlightRouteService {

    @Autowired
    private FlightRouteRepository flightRouteRepository;

    @Autowired
    private AirportRepository airportRepository;

    public List<Long> getShortestRoute(Long startId, Long endId, WeightType weightType) {
        // Fetch the source and destination airports
        Airport source = airportRepository.findById(startId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid source airport id: " + startId));
        Airport destination = airportRepository.findById(endId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid destination airport id: " + endId));

        // Fetch all airports and flight routes to build the graph
        List<Airport> airports = airportRepository.findAll();
        List<FlightRoute> flightRoutes = flightRouteRepository.findAll();

        // Initialize Dijkstra's algorithm with the airports and flight routes
        DijkstraAlgorithm dijkstraAlgorithm = new DijkstraAlgorithm(airports, flightRoutes);

        // Compute the shortest path
        List<Airport> path = dijkstraAlgorithm.computeShortestPath(source, destination, weightType);

        // Convert the list of airports to a list of airport IDs
        return path.stream()
                .map(Airport::getId)
                .collect(Collectors.toList());
    }
    public List<FlightRoute> getAllFlightRoutes() {
        return flightRouteRepository.findAll();
    }

    public Optional<FlightRoute> getFlightRouteById(Long id) {
        return flightRouteRepository.findById(id);
    }

    public FlightRoute createFlightRoute(FlightRoute flightRoute) {
        return flightRouteRepository.save(flightRoute);
    }

    public FlightRoute updateFlightRoute(Long id, FlightRoute flightRouteDetails) {
        Optional<FlightRoute> existingFlightRoute = flightRouteRepository.findById(id);
        if (existingFlightRoute.isPresent()) {
            FlightRoute flightRoute = existingFlightRoute.get();
            // update flightRoute fields with flightRouteDetails
            return flightRouteRepository.save(flightRoute);
        }
        return null;
    }

    public boolean deleteFlightRoute(Long id) {
        if (flightRouteRepository.existsById(id)) {
            flightRouteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
