package com.airlinemanagementsystem.airline_management_system.service;


import com.airlinemanagementsystem.airline_management_system.model.Airport;
import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import com.airlinemanagementsystem.airline_management_system.repository.AirportRepository;
import com.airlinemanagementsystem.airline_management_system.repository.FlightRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DijkstraAlgorithmService {

    @Autowired
    private AirportRepository airportRepository;

    @Autowired
    private FlightRouteRepository flightRouteRepository;

    private static class Node {
        Airport airport;
        double weight;

        Node(Airport airport, double weight) {
            this.airport = airport;
            this.weight = weight;
        }
    }

    public List<Airport> findShortestPath(String sourceCode, String destinationCode, String criteria) {
        Airport source = airportRepository.findByCode(sourceCode)
                .orElseThrow(() -> new RuntimeException("Source airport not found"));
        Airport destination = airportRepository.findByCode(destinationCode)
                .orElseThrow(() -> new RuntimeException("Destination airport not found"));

        PriorityQueue<Node> queue = new PriorityQueue<>(Comparator.comparingDouble(node -> node.weight));
        queue.add(new Node(source, 0));

        Map<Airport, Double> distances = new HashMap<>();
        distances.put(source, 0.0);

        Map<Airport, Airport> predecessors = new HashMap<>();
        Set<Airport> visited = new HashSet<>();

        while (!queue.isEmpty()) {
            Node currentNode = queue.poll();
            Airport currentAirport = currentNode.airport;

            if (visited.contains(currentAirport)) continue;
            visited.add(currentAirport);

            if (currentAirport.equals(destination)) break;

            List<FlightRoute> routes = flightRouteRepository.findBySource(currentAirport);

            for (FlightRoute route : routes) {
                Airport neighbor = route.getDestination();
                if (visited.contains(neighbor)) continue;

                double weight = 0;
                switch (criteria.toLowerCase()) {
                    case "cost":
                        weight = route.getCost();
                        break;
                    case "distance":
                        weight = route.getDistance();
                        break;
                    case "time":
                        weight = route.getTime();
                        break;
                    default:
                        throw new IllegalArgumentException("Invalid criteria: " + criteria);
                }

                double newDist = distances.get(currentAirport) + weight;

                if (newDist < distances.getOrDefault(neighbor, Double.MAX_VALUE)) {
                    distances.put(neighbor, newDist);
                    predecessors.put(neighbor, currentAirport);
                    queue.add(new Node(neighbor, newDist));
                }
            }
        }

        List<Airport> path = new ArrayList<>();
        for (Airport at = destination; at != null; at = predecessors.get(at)) {
            path.add(at);
        }
        Collections.reverse(path);
        return path;
    }

}


