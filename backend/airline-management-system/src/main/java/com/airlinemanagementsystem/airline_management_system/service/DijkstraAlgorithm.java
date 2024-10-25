package com.airlinemanagementsystem.airline_management_system.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DijkstraAlgorithm {

    private Map<Long, Double> distances;
    private Map<Long, Long> previousNodes;
    private PriorityQueue<Node> pq;
    private Set<Long> settled;

    public List<Long> findShortestPath(Long startId, Long endId, Map<Long, List<Edge>> graph) {
        distances = new HashMap<>();
        previousNodes = new HashMap<>();
        pq = new PriorityQueue<>(Comparator.comparingDouble(Node::getCost));
        settled = new HashSet<>();

        distances.put(startId, 0.0);
        pq.add(new Node(startId, 0.0));

        while (!pq.isEmpty()) {
            Node currentNode = pq.poll();
            Long currentId = currentNode.getId();

            if (settled.contains(currentId)) continue;
            settled.add(currentId);

            if (currentId.equals(endId)) break;

            List<Edge> neighbors = graph.getOrDefault(currentId, new ArrayList<>());
            for (Edge edge : neighbors) {
                Long neighborId = edge.getDestinationId();
                double newDist = distances.get(currentId) + edge.getCost();

                if (!distances.containsKey(neighborId) || newDist < distances.get(neighborId)) {
                    distances.put(neighborId, newDist);
                    previousNodes.put(neighborId, currentId);
                    pq.add(new Node(neighborId, newDist));
                }
            }
        }

        return reconstructPath(startId, endId);
    }

    private List<Long> reconstructPath(Long startId, Long endId) {
        List<Long> path = new ArrayList<>();
        for (Long at = endId; at != null; at = previousNodes.get(at)) {
            path.add(at);
        }
        Collections.reverse(path);

        return path.get(0).equals(startId) ? path : new ArrayList<>();
    }

    private static class Node {
        private Long id;
        private Double cost;

        public Node(Long id, Double cost) {
            this.id = id;
            this.cost = cost;
        }

        public Long getId() {
            return id;
        }

        public Double getCost() {
            return cost;
        }
    }

    public static class Edge {
        private Long destinationId;
        private double cost;

        public Edge(Long destinationId, double cost) {
            this.destinationId = destinationId;
            this.cost = cost;
        }

        public Long getDestinationId() {
            return destinationId;
        }

        public double getCost() {
            return cost;
        }
    }
}
