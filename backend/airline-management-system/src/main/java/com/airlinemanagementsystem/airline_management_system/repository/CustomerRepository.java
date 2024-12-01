package com.airlinemanagementsystem.airline_management_system.repository;

import com.airlinemanagementsystem.airline_management_system.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    long countByFrequentFlyerTrue();  // Custom method to count frequent flyers
}
