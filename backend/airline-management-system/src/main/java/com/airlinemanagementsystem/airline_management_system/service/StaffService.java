package com.airlinemanagementsystem.airline_management_system.service;

import com.airlinemanagementsystem.airline_management_system.model.Staff;
import com.airlinemanagementsystem.airline_management_system.model.Staff.StaffRole;
import com.airlinemanagementsystem.airline_management_system.repository.StaffRepository;

import com.airlinemanagementsystem.airline_management_system.user.User;
import com.airlinemanagementsystem.airline_management_system.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {

    private final StaffRepository staffRepository;
    private final UserRepository userRepository;

    @Autowired
    public StaffService(StaffRepository staffRepository, UserRepository userRepository) {
        this.staffRepository = staffRepository;
        this.userRepository = userRepository;
    }

    // Create or Update Staff
    public Staff saveStaff(Staff staff) {
        // Retrieve User by userId
        Optional<User> userOpt = userRepository.findById(staff.getUser().getId());
        if (!userOpt.isPresent()) {
            throw new IllegalArgumentException("User not found for ID: " + staff.getUser().getId());
        }
        staff.setUser(userOpt.get());  // Set the User object in the Staff

        return staffRepository.save(staff);
    }

    // Get all Staff members
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    // Get Staff by ID
    public Optional<Staff> getStaffById(Long staffId) {
        return staffRepository.findById(staffId);
    }

    // Delete Staff by ID
    public void deleteStaff(Long staffId) {
        staffRepository.deleteById(staffId);
    }
}
