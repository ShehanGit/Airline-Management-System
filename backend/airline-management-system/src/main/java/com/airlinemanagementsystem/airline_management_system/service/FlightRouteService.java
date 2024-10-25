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

    @Autowired
    private DijkstraAlgorithm dijkstraAlgorithm;

    public List<Long> getShortestRoute(Long startId, Long endId) {
        Map<Long, List<DijkstraAlgorithm.Edge>> graph = buildGraph();
        return dijkstraAlgorithm.findShortestPath(startId, endId, graph);
    }

    private Map<Long, List<DijkstraAlgorithm.Edge>> buildGraph() {
        Map<Long, List<DijkstraAlgorithm.Edge>> graph = new HashMap<>();

        List<FlightRoute> routes = flightRouteRepository.findAll();
        for (FlightRoute route : routes) {
            Long sourceId = route.getSource().getId();
            Long destId = route.getDestination().getId();
            double distance = route.getDistance();

            // Add edge from source to destination
            graph.computeIfAbsent(sourceId, k -> new ArrayList<>())
                    .add(new DijkstraAlgorithm.Edge(destId, distance));

            // If flights are bidirectional, add reverse edge
            graph.computeIfAbsent(destId, k -> new ArrayList<>())
                    .add(new DijkstraAlgorithm.Edge(sourceId, distance));
        }

        return graph;
    }
}
