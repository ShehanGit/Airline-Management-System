package com.airlinemanagementsystem.airline_management_system.controller;

import com.airlinemanagementsystem.airline_management_system.exception.ResourceNotFoundException;
import com.airlinemanagementsystem.airline_management_system.model.Booking;
import com.airlinemanagementsystem.airline_management_system.model.FlightRoute;
import com.airlinemanagementsystem.airline_management_system.repository.FlightRouteRepository;
import com.airlinemanagementsystem.airline_management_system.service.BookingService;
import com.airlinemanagementsystem.airline_management_system.user.User;
import com.airlinemanagementsystem.airline_management_system.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FlightRouteRepository flightRouteRepository;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Get all bookings
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // Get a specific booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable("id") Long id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        return booking.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // Create a new booking
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        // Retrieve the User object from the database using the provided user.id
        User user = userRepository.findById(booking.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + booking.getUser().getId()));

        // Set the retrieved User object to the booking
        booking.setUser(user);

        // Retrieve the FlightRoute object from the database using the provided flightRoute.id
        FlightRoute flightRoute = flightRouteRepository.findById(booking.getFlightRoute().getId())
                .orElseThrow(() -> new ResourceNotFoundException("FlightRoute not found with id: " + booking.getFlightRoute().getId()));

        // Set the retrieved FlightRoute object to the booking
        booking.setFlightRoute(flightRoute);

        Booking createdBooking = bookingService.createBooking(booking);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
    }

    // Update an existing booking
    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable("id") Long id, @RequestBody Booking bookingDetails) {
        Booking updatedBooking = bookingService.updateBooking(id, bookingDetails);
        if (updatedBooking != null) {
            return ResponseEntity.ok(updatedBooking);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Delete a booking by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable("id") Long id) {
        if (bookingService.deleteBooking(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}