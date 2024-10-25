package com.airlinemanagementsystem.airline_management_system;

import java.util.*;

class Graph {
    private final Map<String, Map<String, Integer>> graph;

    public Graph() {
        graph = new HashMap<>();
    }

    public void addEdge(String source, String destination, int weight) {
        graph.computeIfAbsent(source, k -> new HashMap<>()).put(destination, weight);
        graph.computeIfAbsent(destination, k -> new HashMap<>()).put(source, weight); // If bidirectional
    }

    public Result dijkstra(String start, String end) {
        Map<String, Integer> distances = new HashMap<>();
        Map<String, String> previousNodes = new HashMap<>();
        PriorityQueue<Node> priorityQueue = new PriorityQueue<>(Comparator.comparingInt(node -> node.distance));
        Set<String> visited = new HashSet<>();

        // Initialize distances
        for (String node : graph.keySet()) {
            distances.put(node, Integer.MAX_VALUE);
        }
        distances.put(start, 0);
        priorityQueue.add(new Node(start, 0));

        while (!priorityQueue.isEmpty()) {
            Node currentNode = priorityQueue.poll();
            String current = currentNode.name;

            if (!visited.add(current)) {
                continue;
            }

            if (current.equals(end)) {
                break;
            }

            Map<String, Integer> neighbors = graph.getOrDefault(current, new HashMap<>());
            for (Map.Entry<String, Integer> neighbor : neighbors.entrySet()) {
                String neighborNode = neighbor.getKey();
                int newDist = distances.get(current) + neighbor.getValue();

                if (newDist < distances.get(neighborNode)) {
                    distances.put(neighborNode, newDist);
                    previousNodes.put(neighborNode, current);
                    priorityQueue.add(new Node(neighborNode, newDist));
                }
            }
        }

        if (distances.get(end) == Integer.MAX_VALUE) {
            return new Result(-1, Collections.emptyList());
        }

        // Reconstruct the shortest path
        List<String> path = new ArrayList<>();
        String current = end;
        while (current != null) {
            path.add(current);
            current = previousNodes.get(current);
        }
        Collections.reverse(path);

        return new Result(distances.get(end), path);
    }

    static class Node {
        String name;
        int distance;

        Node(String name, int distance) {
            this.name = name;
            this.distance = distance;
        }
    }

    static class Result {
        int distance;
        List<String> path;

        Result(int distance, List<String> path) {
            this.distance = distance;
            this.path = path;
        }
    }
}