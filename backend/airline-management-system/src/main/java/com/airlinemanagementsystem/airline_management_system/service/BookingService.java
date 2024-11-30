package com.airlinemanagementsystem.airline_management_system.service;

import com.airlinemanagementsystem.airline_management_system.model.Booking;
import com.airlinemanagementsystem.airline_management_system.repository.BookingRepository;
import com.airlinemanagementsystem.airline_management_system.repository.FlightRouteRepository;
import com.airlinemanagementsystem.airline_management_system.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final FlightRouteRepository flightRouteRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, FlightRouteRepository flightRouteRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.flightRouteRepository = flightRouteRepository;
    }

    // Create a new booking
    public Booking createBooking(Booking booking) {
        // Validation can be added here (e.g., check if user and flightRoute exist)
        return bookingRepository.save(booking);
    }

    // Get all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get a booking by ID
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    // Update a booking
    public Booking updateBooking(Long id, Booking bookingDetails) {
        Optional<Booking> bookingOptional = bookingRepository.findById(id);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            booking.setSeatsBooked(bookingDetails.getSeatsBooked());
            booking.setBookingStatus(bookingDetails.getBookingStatus());
            booking.setTotalPrice(bookingDetails.getTotalPrice());
            return bookingRepository.save(booking);
        }
        return null;  // Handle booking not found (could throw an exception)
    }

    // Delete a booking by ID
    public boolean deleteBooking(Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
