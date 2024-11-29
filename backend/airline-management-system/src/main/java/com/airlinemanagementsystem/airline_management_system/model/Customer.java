package com.airlinemanagementsystem.airline_management_system.model;

import com.airlinemanagementsystem.airline_management_system.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "passport_number", unique = true)
    private String passportNumber;

    @Column(name = "loyalty_points")
    private Integer loyaltyPoints;

    @Column(name = "frequent_flyer")
    private Boolean frequentFlyer;

    @Column(name = "address")
    private String address;

    @Column(name = "country")
    private String country;
}
