package com.airlinemanagementsystem.airline_management_system.repository;

import com.airlinemanagementsystem.airline_management_system.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Find customer by user ID (foreign key relationship)
    Optional<Customer> findByUserId(Long userId);

    // Find customer by passport number
    Optional<Customer> findByPassportNumber(String passportNumber);
}
