package com.airlinemanagementsystem.airline_management_system.algorithm;

import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

public class DijkstraAlgorithm {

    public static Map<Long, Double> dijkstra(Map<Long, Map<Long, Double>> graph, Long start) {
        // Map to store the shortest distance from the start node to each other node
        Map<Long, Double> distances = new HashMap<>();
        for (Long node : graph.keySet()) {
            distances.put(node, Double.MAX_VALUE);
        }
        distances.put(start, 0.0);

        // Priority queue to select the node with the shortest known distance
        PriorityQueue<Node> priorityQueue = new PriorityQueue<>();
        priorityQueue.add(new Node(start, 0.0));

        while (!priorityQueue.isEmpty()) {
            Node current = priorityQueue.poll();
            Long currentNode = current.id;
            double currentDistance = current.distance;

            if (currentDistance > distances.get(currentNode)) continue;

            // Explore neighbors
            Map<Long, Double> neighbors = graph.getOrDefault(currentNode, new HashMap<>());
            for (Map.Entry<Long, Double> entry : neighbors.entrySet()) {
                Long neighbor = entry.getKey();
                double weight = entry.getValue();
                double newDistance = currentDistance + weight;

                if (newDistance < distances.get(neighbor)) {
                    distances.put(neighbor, newDistance);
                    priorityQueue.add(new Node(neighbor, newDistance));
                }
            }
        }
        return distances;
    }

    // Helper class to represent nodes with distance
    static class Node implements Comparable<Node> {
        Long id;
        double distance;

        public Node(Long id, double distance) {
            this.id = id;
            this.distance = distance;
        }

        @Override
        public int compareTo(Node other) {
            return Double.compare(this.distance, other.distance);
        }
    }
}
