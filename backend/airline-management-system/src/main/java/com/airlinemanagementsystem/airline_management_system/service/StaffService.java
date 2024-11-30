package com.airlinemanagementsystem.airline_management_system.service;

import com.airlinemanagementsystem.airline_management_system.model.Staff;
import com.airlinemanagementsystem.airline_management_system.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    // Get all staff
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    // Get staff by ID
    public Staff getStaffById(Long id) {
        Optional<Staff> staff = staffRepository.findById(id);
        return staff.orElse(null);
    }

    // Create a new staff member
    public Staff createStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    // Update existing staff
    public Staff updateStaff(Long id, Staff staff) {
        Optional<Staff> existingStaff = staffRepository.findById(id);
        if (existingStaff.isPresent()) {
            Staff updatedStaff = existingStaff.get();
            updatedStaff.setUser(staff.getUser());
            updatedStaff.setRole(staff.getRole());
            updatedStaff.setSalary(staff.getSalary());
            updatedStaff.setShiftStart(staff.getShiftStart());
            updatedStaff.setShiftEnd(staff.getShiftEnd());
            return staffRepository.save(updatedStaff);
        }
        return null;
    }

    // Delete staff by ID
    public boolean deleteStaff(Long id) {
        Optional<Staff> staff = staffRepository.findById(id);
        if (staff.isPresent()) {
            staffRepository.delete(staff.get());
            return true;
        }
        return false;
    }
}
