package com.airlinemanagementsystem.airline_management_system.repository;

import com.airlinemanagementsystem.airline_management_system.model.Aircraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft, Long> {
    // You can add custom query methods if needed, for example:
    // List<Aircraft> findByAircraftModel(String model);
}
