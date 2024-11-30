package com.airlinemanagementsystem.airline_management_system.repository;

import com.airlinemanagementsystem.airline_management_system.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Custom queries can be added here if needed
}
