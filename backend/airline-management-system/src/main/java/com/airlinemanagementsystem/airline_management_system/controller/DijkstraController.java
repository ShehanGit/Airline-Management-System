package com.airlinemanagementsystem.airline_management_system.controller;

import com.airlinemanagementsystem.airline_management_system.algorithm.DijkstraAlgorithm;
import com.airlinemanagementsystem.airline_management_system.service.DijkstraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dijkstra")
public class DijkstraController {

    @Autowired
    private DijkstraService dijkstraService;

    @GetMapping("/shortest-path")
    public Map<Long, Double> getShortestPath(@RequestParam Long startAirportId) {
        // Retrieve graph and apply Dijkstra's algorithm
        Map<Long, Map<Long, Double>> graph = dijkstraService.createGraph();
        return DijkstraAlgorithm.dijkstra(graph, startAirportId); // Call the dijkstra method in DijkstraAlgorithm
    }
}
