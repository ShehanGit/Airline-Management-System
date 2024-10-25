package com.airlinemanagementsystem.airline_management_system.dto;

import java.util.List;

public class RouteResponse {
    private List<Long> route;

    public RouteResponse(List<Long> route) {
        this.route = route;
    }

    public List<Long> getRoute() {
        return route;
    }

    public void setRoute(List<Long> route) {
        this.route = route;
    }
}
