package com.airlinemanagementsystem.airline_management_system.service;

import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import com.airlinemanagementsystem.airline_management_system.repository.FlightRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FlightRouteService {
    @Autowired
    private FlightRouteRepository flightRouteRepository;

    public List<Long> getShortestRoute(Long startId, Long endId) {
        Map<Long, List<FlightRoute>> graph = buildGraph();
        Map<Long, Long> previousNodes = DijkstraAlgorithm.findShortestPath(startId, graph);

        List<Long> path = new ArrayList<>();
        for (Long at = endId; at != null; at = previousNodes.get(at)) {
            path.add(at);
        }
        Collections.reverse(path);
        return path;
    }

    private Map<Long, List<FlightRoute>> buildGraph() {
        Map<Long, List<FlightRoute>> graph = new HashMap<>();
        for (FlightRoute route : flightRouteRepository.findAll()) {
            graph.computeIfAbsent(route.getSource().getId(), k -> new ArrayList<>()).add(route);
        }
        return graph;
    }
}
