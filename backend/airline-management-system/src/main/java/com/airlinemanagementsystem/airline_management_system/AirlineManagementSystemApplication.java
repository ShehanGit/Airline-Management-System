package com.airlinemanagementsystem.airline_management_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.airlinemanagementsystem.airline_management_system.config.JwtService;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class AirlineManagementSystemApplication {

	public static void main(String[] args) {

		SpringApplication.run(AirlineManagementSystemApplication.class, args);
	}

}
