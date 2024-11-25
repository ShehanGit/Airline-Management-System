package com.airlinemanagementsystem.airline_management_system.controller;

import com.airlinemanagementsystem.airline_management_system.model.WeightType;
import com.airlinemanagementsystem.airline_management_system.service.FlightRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
public class FlightRouteController {
    @Autowired
    private FlightRouteService flightRouteService;

    @GetMapping("/shortest")
    public List<Long> getShortestRoute(
            @RequestParam Long startId,
            @RequestParam Long endId,
            @RequestParam(defaultValue = "DISTANCE") String weightType) {

        WeightType wt = WeightType.fromString(weightType);
        return flightRouteService.getShortestRoute(startId, endId, wt);
    }
}
