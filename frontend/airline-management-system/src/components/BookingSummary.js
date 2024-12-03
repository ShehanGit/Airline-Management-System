import React from 'react';
import { Plane, MapPin, Users, Calendar } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const BookingSummary = () => {
  const { bookingDetails } = useBooking();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center text-blue-600 mb-2">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="font-medium">From</span>
          </div>
          <p className="text-gray-800 font-bold">{bookingDetails.from}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center text-blue-600 mb-2">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="font-medium">To</span>
          </div>
          <p className="text-gray-800 font-bold">{bookingDetails.to}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center text-blue-600 mb-2">
            <Users className="h-5 w-5 mr-2" />
            <span className="font-medium">Passengers</span>
          </div>
          <p className="text-gray-800 font-bold">{bookingDetails.totalPassengers}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center text-blue-600 mb-2">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="font-medium">Date</span>
          </div>
          <p className="text-gray-800 font-bold">{bookingDetails.date}</p>
        </div>
      </div>

      {bookingDetails.flight && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center gap-4 mb-2">
            <Plane className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-gray-800">
              Flight {bookingDetails.flight.flightNumber}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Departure</p>
              <p className="font-medium">
                {new Date(bookingDetails.flight.departureTime).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Arrival</p>
              <p className="font-medium">
                {new Date(bookingDetails.flight.arrivalTime).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;