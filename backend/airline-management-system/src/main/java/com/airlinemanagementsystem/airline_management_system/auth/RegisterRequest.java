package com.airlinemanagementsystem.airline_management_system.auth;


import com.airlinemanagementsystem.airline_management_system.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String firstname;
  private String lastname;
  private String email;
  private String password;
  private Role role; // Add this field to include the role in the registration request
}
