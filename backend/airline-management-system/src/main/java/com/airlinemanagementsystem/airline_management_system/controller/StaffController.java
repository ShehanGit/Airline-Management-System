package com.airlinemanagementsystem.airline_management_system.controller;

import com.airlinemanagementsystem.airline_management_system.model.Staff;
import com.airlinemanagementsystem.airline_management_system.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffService staffService;

    @Autowired
    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    // Create or Update Staff
    @PostMapping
    public ResponseEntity<Staff> createOrUpdateStaff(@RequestBody Staff staff) {
        try {
            Staff savedStaff = staffService.saveStaff(staff);
            return new ResponseEntity<>(savedStaff, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  // 400 Bad Request if user not found
        }
    }

    // Get all Staff members
    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff() {
        List<Staff> staffList = staffService.getAllStaff();
        return new ResponseEntity<>(staffList, HttpStatus.OK);
    }

    // Get Staff by ID
    @GetMapping("/{staffId}")
    public ResponseEntity<Staff> getStaffById(@PathVariable Long staffId) {
        Optional<Staff> staff = staffService.getStaffById(staffId);
        if (staff.isPresent()) {
            return new ResponseEntity<>(staff.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete Staff by ID
    @DeleteMapping("/{staffId}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long staffId) {
        staffService.deleteStaff(staffId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
