package com.airlinemanagementsystem.airline_management_system.demo;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class RoleBasedController {

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminEndpoint() {
        return "Admin content";
    }

    @GetMapping("/manager")
    @PreAuthorize("hasRole('MANAGER')")
    public String managerEndpoint() {
        return "Manager content";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public String userEndpoint() {
        return "User content";
    }
}
