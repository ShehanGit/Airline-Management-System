package com.airlinemanagementsystem.airline_management_system.service;

import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import com.airlinemanagementsystem.airline_management_system.repository.FlightRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DijkstraService {

    @Autowired
    private FlightRouteRepository flightRouteRepository;

    public Map<Long, Map<Long, Double>> createGraph() {
        List<FlightRoute> routes = flightRouteRepository.findAll();
        Map<Long, Map<Long, Double>> graph = new HashMap<>();

        for (FlightRoute route : routes) {
            graph
                    .computeIfAbsent(route.getSource().getId(), k -> new HashMap<>())
                    .put(route.getDestination().getId(), route.getDistance());
        }
        return graph;
    }
}
