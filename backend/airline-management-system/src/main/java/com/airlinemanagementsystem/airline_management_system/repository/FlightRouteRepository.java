package com.airlinemanagementsystem.airline_management_system.repository;

import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRouteRepository extends JpaRepository<FlightRoute, Long> {
    List<FlightRoute> findBySourceId(Long sourceId);
}
