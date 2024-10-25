package com.airlinemanagementsystem.airline_management_system.controller;

import com.airlinemanagementsystem.airline_management_system.model.Airport;
import com.airlinemanagementsystem.airline_management_system.service.DijkstraAlgorithmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/route-optimization")
public class RouteOptimizationController {

    @Autowired
    private DijkstraAlgorithmService dijkstraAlgorithmService;

    @GetMapping
    public List<Airport> findOptimalRoute(@RequestParam String source,
                                          @RequestParam String destination,
                                          @RequestParam String criteria) {
        return dijkstraAlgorithmService.findShortestPath(source, destination, criteria);
    }
}
