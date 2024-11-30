package com.airlinemanagementsystem.airline_management_system.controller;

import com.airlinemanagementsystem.airline_management_system.model.Staff;
import com.airlinemanagementsystem.airline_management_system.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    private StaffService staffService;

    // Get all staff members
    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff() {
        List<Staff> staffList = staffService.getAllStaff();
        return ResponseEntity.ok(staffList);
    }

    // Get staff by ID
    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable Long id) {
        Staff staff = staffService.getStaffById(id);
        if (staff != null) {
            return ResponseEntity.ok(staff);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Create a new staff member
    @PostMapping
    public ResponseEntity<Staff> createStaff(@RequestBody Staff staff) {
        Staff newStaff = staffService.createStaff(staff);
        return ResponseEntity.status(HttpStatus.CREATED).body(newStaff);
    }

    // Update existing staff details
    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable Long id, @RequestBody Staff staff) {
        Staff updatedStaff = staffService.updateStaff(id, staff);
        if (updatedStaff != null) {
            return ResponseEntity.ok(updatedStaff);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Delete staff member by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long id) {
        boolean isDeleted = staffService.deleteStaff(id);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
