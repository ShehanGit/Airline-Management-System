package com.airlinemanagementsystem.airline_management_system.model;

import com.airlinemanagementsystem.airline_management_system.user.User;
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
@Table(name = "staff")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long staffId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private StaffRole role;

    @Column(name = "salary")
    private Double salary;

    @Column(name = "shift_start")
    @Temporal(TemporalType.TIMESTAMP)
    private Date shiftStart;

    @Column(name = "shift_end")
    @Temporal(TemporalType.TIMESTAMP)
    private Date shiftEnd;

    public enum StaffRole {
        PILOT, CREW, MAINTENANCE, GROUND_SUPPORT
    }
}
