package com.airlinemanagementsystem.airline_management_system.service;

import com.airlinemanagementsystem.airline_management_system.model.Airport;
import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import com.airlinemanagementsystem.airline_management_system.repository.AirportRepository;
import com.airlinemanagementsystem.airline_management_system.repository.FlightRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.function.Function;

@Service
public class DijkstraAlgorithmService {

    private static final Logger logger = LoggerFactory.getLogger(DijkstraAlgorithmService.class);

    @Autowired
    private AirportRepository airportRepository;

    @Autowired
    private FlightRouteRepository flightRouteRepository;

    private static class Node implements Comparable<Node> {
        Airport airport;
        double weight;

        Node(Airport airport, double weight) {
            this.airport = airport;
            this.weight = weight;
        }

        @Override
        public int compareTo(Node other) {
            return Double.compare(this.weight, other.weight);
        }
    }

    public List<Airport> findShortestPath(String sourceCode, String destinationCode, String criteria) {
        Airport source = airportRepository.findByCode(sourceCode)
                .orElseThrow(() -> new RuntimeException("Source airport not found: " + sourceCode));
        Airport destination = airportRepository.findByCode(destinationCode)
                .orElseThrow(() -> new RuntimeException("Destination airport not found: " + destinationCode));

        Function<FlightRoute, Double> weightFunction = getWeightFunction(criteria);

        PriorityQueue<Node> queue = new PriorityQueue<>();
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

                double weight = weightFunction.apply(route);
                double newDist = distances.get(currentAirport) + weight;

                if (newDist < distances.getOrDefault(neighbor, Double.MAX_VALUE)) {
                    distances.put(neighbor, newDist);
                    predecessors.put(neighbor, currentAirport);
                    queue.add(new Node(neighbor, newDist));
                }
            }

            logger.info("Processed Airport: {}", currentAirport.getCode());
            logger.debug("Distances Map: {}", getReadableMap(distances));
            logger.debug("Predecessors Map: {}", getReadablePredecessorsMap(predecessors));
        }

        return buildPath(destination, predecessors, source);
    }

    private List<Airport> buildPath(Airport destination, Map<Airport, Airport> predecessors, Airport source) {
        List<Airport> path = new ArrayList<>();
        for (Airport at = destination; at != null; at = predecessors.get(at)) {
            path.add(at);
            logger.info("Path step added: {}", at.getCode());
        }

        Collections.reverse(path);

        if (path.size() == 1 && !path.contains(source)) {
            logger.warn("No path found from {} to {}", source.getCode(), destination.getCode());
            return Collections.emptyList();
        }

        return path;
    }

    private Function<FlightRoute, Double> getWeightFunction(String criteria) {
        switch (criteria.toLowerCase()) {
            case "cost":
                return FlightRoute::getCost;
            case "distance":
                return FlightRoute::getDistance;
            case "time":
                return FlightRoute::getTime;
            default:
                throw new IllegalArgumentException("Invalid criteria: " + criteria);
        }
    }

    private String getReadableMap(Map<Airport, Double> map) {
        StringBuilder result = new StringBuilder("{");
        for (Map.Entry<Airport, Double> entry : map.entrySet()) {
            result.append(entry.getKey().getCode()).append("=").append(entry.getValue()).append(", ");
        }
        return result.append("}").toString();
    }

    private String getReadablePredecessorsMap(Map<Airport, Airport> predecessors) {
        StringBuilder result = new StringBuilder("{");
        for (Map.Entry<Airport, Airport> entry : predecessors.entrySet()) {
            result.append(entry.getKey().getCode())
                    .append("->")
                    .append(entry.getValue() != null ? entry.getValue().getCode() : "null")
                    .append(", ");
        }
        return result.append("}").toString();
    }
}
