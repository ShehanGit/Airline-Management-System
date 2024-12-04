import React, { useEffect } from 'react';

const LocalStorageMonitor = () => {
  useEffect(() => {
    // Function to retrieve and log local storage values
    const displayLocalStorageValues = () => {
      try {
        // Get flight search data
        const flightSearchData = localStorage.getItem('flightSearchData');
        const parsedFlightSearchData = flightSearchData ? JSON.parse(flightSearchData) : null;
        
        // Get booking details
        const bookingDetails = localStorage.getItem('bookingDetails');
        const parsedBookingDetails = bookingDetails ? JSON.parse(bookingDetails) : null;
        
        // Log the values
        console.group('Local Storage Values');
        console.log('Flight Search Data:', parsedFlightSearchData);
        console.log('Booking Details:', parsedBookingDetails);
        console.groupEnd();
        
      } catch (error) {
        console.error('Error reading from localStorage:', error);
      }
    };

    // Call the function immediately
    displayLocalStorageValues();

    // Set up an interval to monitor changes
    const intervalId = setInterval(displayLocalStorageValues, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return null; // This component doesn't render anything
};

export default LocalStorageMonitor;