package com.airlinemanagementsystem.airline_management_system.service;

import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;

import java.util.*;

public class DijkstraAlgorithm {
    public static Map<Long, Long> findShortestPath(Long startId, Map<Long, List<FlightRoute>> graph) {
        Map<Long, Double> distances = new HashMap<>();
        Map<Long, Long> previousNodes = new HashMap<>();

        // Comparator to prioritize entries based on distances
        PriorityQueue<Map.Entry<Long, Double>> pq = new PriorityQueue<>(Comparator.comparingDouble(Map.Entry::getValue));

        // Initialize all distances to infinity, and 0 for the start node
        for (Long airportId : graph.keySet()) {
            distances.put(airportId, Double.MAX_VALUE);
        }
        distances.put(startId, 0.0);
        pq.add(new AbstractMap.SimpleEntry<>(startId, 0.0));

        while (!pq.isEmpty()) {
            Long currentId = pq.poll().getKey();
            Double currentDistance = distances.getOrDefault(currentId, Double.MAX_VALUE);

            // Avoid processing if the node's distance is still "infinity" (unreachable)
            if (currentDistance.equals(Double.MAX_VALUE)) {
                continue;
            }

            for (FlightRoute route : graph.getOrDefault(currentId, new ArrayList<>())) {
                Long neighborId = route.getDestination().getId();
                double newDist = currentDistance + route.getDistance();

                // Update distance if a shorter path is found
                if (newDist < distances.getOrDefault(neighborId, Double.MAX_VALUE)) {
                    distances.put(neighborId, newDist);
                    previousNodes.put(neighborId, currentId);
                    pq.add(new AbstractMap.SimpleEntry<>(neighborId, newDist));
                }
            }
        }

        // Return the map of previous nodes to trace the path
        return previousNodes;
    }
}
