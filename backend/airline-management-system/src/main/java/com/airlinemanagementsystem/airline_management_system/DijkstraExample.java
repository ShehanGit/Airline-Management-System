package com.airlinemanagementsystem.airline_management_system;

public class DijkstraExample {
    public static void main(String[] args) {
        Graph graph = new Graph();
        graph.addEdge("A", "B", 1);
        graph.addEdge("A", "D", 3);
        graph.addEdge("B", "C", 1);
        graph.addEdge("B", "D", 4);
        graph.addEdge("C", "E", 2);
        graph.addEdge("D", "E", 1);

        String start = "A";
        String end = "B";
        Graph.Result result = graph.dijkstra(start, end);

        if (result.distance != -1) {
            System.out.println("Shortest distance from " + start + " to " + end + ": " + result.distance);
            System.out.println("Path: " + String.join(" -> ", result.path));
        } else {
            System.out.println("No path exists from " + start + " to " + end);
        }
    }
}
