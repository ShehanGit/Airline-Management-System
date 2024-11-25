package com.airlinemanagementsystem.airline_management_system.service;

import com.airlinemanagementsystem.airline_management_system.model.Airport;
import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import com.airlinemanagementsystem.airline_management_system.model.WeightType;

import java.util.*;

public class DijkstraAlgorithm {

    private final Map<Long, Airport> airportsById;
    private final Map<Long, List<Edge>> adjacencyList;

    public DijkstraAlgorithm(List<Airport> airports, List<FlightRoute> flightRoutes) {
        airportsById = new HashMap<>();
        for (Airport airport : airports) {
            airportsById.put(airport.getId(), airport);
        }
        adjacencyList = new HashMap<>();
        buildGraph(flightRoutes);
    }

    private void buildGraph(List<FlightRoute> flightRoutes) {
        for (FlightRoute route : flightRoutes) {
            Long sourceId = route.getSource().getId();
            Long destId = route.getDestination().getId();
            double distance = route.getDistance();
            double cost = route.getCost();
            double time = route.getTime();

            // Initialize adjacency list entries if not present
            adjacencyList.computeIfAbsent(sourceId, k -> new ArrayList<>());

            // Add edge from source to destination
            adjacencyList.get(sourceId).add(new Edge(destId, distance, cost, time));

            // Since routes are unidirectional, do not add the reverse edge
        }
    }

    public List<Airport> computeShortestPath(Airport source, Airport destination, WeightType weightType) {
        Map<Long, Double> distances = new HashMap<>();
        Map<Long, Long> previous = new HashMap<>();
        PriorityQueue<Node> queue = new PriorityQueue<>(Comparator.comparingDouble(n -> n.distance));

        // Initialize distances to infinity, except for the source
        for (Long airportId : airportsById.keySet()) {
            distances.put(airportId, Double.MAX_VALUE);
        }
        distances.put(source.getId(), 0.0);

        queue.add(new Node(source.getId(), 0.0));

        while (!queue.isEmpty()) {
            Node currentNode = queue.poll();
            Long currentAirportId = currentNode.airportId;

            if (currentAirportId.equals(destination.getId())) {
                break; // Reached the destination
            }

            List<Edge> neighbors = adjacencyList.getOrDefault(currentAirportId, Collections.emptyList());

            for (Edge edge : neighbors) {
                Long neighborId = edge.destinationId;

                double edgeWeight;
                switch (weightType) {
                    case DISTANCE:
                        edgeWeight = edge.distance;
                        break;
                    case COST:
                        edgeWeight = edge.cost;
                        break;
                    case TIME:
                        edgeWeight = edge.time;
                        break;
                    default:
                        throw new IllegalArgumentException("Invalid weight type");
                }

                double newDist = distances.get(currentAirportId) + edgeWeight;
                if (newDist < distances.get(neighborId)) {
                    distances.put(neighborId, newDist);
                    previous.put(neighborId, currentAirportId);
                    queue.add(new Node(neighborId, newDist));
                }
            }
        }

        // Reconstruct the shortest path
        LinkedList<Airport> path = new LinkedList<>();
        Long currentId = destination.getId();

        if (!distances.containsKey(currentId) || distances.get(currentId) == Double.MAX_VALUE) {
            // No path found
            return path;
        }

        while (currentId != null && !currentId.equals(source.getId())) {
            Airport airport = airportsById.get(currentId);
            path.addFirst(airport);
            currentId = previous.get(currentId);
        }

        // Add the source airport at the beginning
        if (currentId != null) {
            path.addFirst(airportsById.get(currentId));
        }

        return path;
    }

    private static class Edge {
        Long destinationId;
        double distance;
        double cost;
        double time;

        public Edge(Long destinationId, double distance, double cost, double time) {
            this.destinationId = destinationId;
            this.distance = distance;
            this.cost = cost;
            this.time = time;
        }
    }

    private static class Node {
        Long airportId;
        double distance;

        public Node(Long airportId, double distance) {
            this.airportId = airportId;
            this.distance = distance;
        }
    }
}
