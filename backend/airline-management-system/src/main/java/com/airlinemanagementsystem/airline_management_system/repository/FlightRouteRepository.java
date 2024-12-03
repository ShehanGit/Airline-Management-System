package com.airlinemanagementsystem.airline_management_system.repository;

import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FlightRouteRepository extends JpaRepository<FlightRoute, Long> {
    List<FlightRoute> findBySourceId(Long sourceId);

    @Query("SELECT f FROM FlightRoute f " +
            "WHERE f.source.city = :departureCity " +
            "AND f.destination.city = :arrivalCity")
    List<FlightRoute> findAvailableFlights(
            @Param("departureCity") String departureCity,
            @Param("arrivalCity") String arrivalCity
    );
}
