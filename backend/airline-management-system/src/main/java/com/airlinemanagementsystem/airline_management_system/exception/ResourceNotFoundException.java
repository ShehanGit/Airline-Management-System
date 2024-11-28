package com.airlinemanagementsystem.airline_management_system.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    // Overloaded constructor to include a cause for the exception
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
