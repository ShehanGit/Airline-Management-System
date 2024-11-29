package com.airlinemanagementsystem.airline_management_system.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "aircraft")
public class Aircraft {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long aircraftId;

    @Column(name = "aircraft_model", nullable = false)
    private String aircraftModel;

    @Column(name = "manufacturer", nullable = false)
    private String manufacturer;

    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @Column(name = "maintenance_date")
    @Temporal(TemporalType.DATE)
    private Date maintenanceDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "aircraft_status")
    private AircraftStatus aircraftStatus;

    public enum AircraftStatus {
        IN_SERVICE, UNDER_MAINTENANCE, RETIRED
    }
}
