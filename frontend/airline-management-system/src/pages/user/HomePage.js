import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plane, Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

const BookingProgress = ({ currentStep }) => {
  const steps = ['Search', 'Select Flight', 'Passengers', 'Payment'];
  
  return (
    <div className="w-full py-4 mb-8">
      <div className="flex justify-between items-center relative">
        {/* Progress Line */}
        <div className="absolute left-0 top-1/2 h-1 bg-gray-200 w-full -z-10"></div>
        <div 
          className="absolute left-0 top-1/2 h-1 bg-blue-600 transition-all duration-500 -z-10"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
              ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {index + 1}
            </div>
            <span className="text-sm font-medium">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FlightSelectionPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        const passengers = searchParams.get('passengers');
        const flightClass = searchParams.get('class');

        // Mock data for demonstration
        const mockFlights = [
          {
            id: 1,
            flightNumber: "SK123",
            source: { name: from },
            destination: { name: to },
            departureTime: new Date().toISOString(),
            arrivalTime: new Date(Date.now() + 3600000).toISOString(),
            cost: 599,
            seatsAvailable: 50
          },
          // Add more mock flights as needed
        ];

        setFlights(mockFlights);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFlights();
  }, [location.search]);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    // Save booking details to localStorage
    const bookingDetails = {
      flight,
      from: searchParams.get('from'),
      to: searchParams.get('to'),
      passengers: searchParams.get('passengers'),
      class: searchParams.get('class'),
      date: searchParams.get('date')
    };
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    navigate('/booking/passengers');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching for flights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Progress Bar */}
        <BookingProgress currentStep={1} />
        
        {/* Search Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Flight Search</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center text-blue-600 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="font-medium">From</span>
              </div>
              <p className="text-gray-800 font-bold">{searchParams.get('from')}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center text-blue-600 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="font-medium">To</span>
              </div>
              <p className="text-gray-800 font-bold">{searchParams.get('to')}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center text-blue-600 mb-2">
                <Users className="h-5 w-5 mr-2" />
                <span className="font-medium">Passengers</span>
              </div>
              <p className="text-gray-800 font-bold">{searchParams.get('passengers')}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center text-blue-600 mb-2">
                <Plane className="h-5 w-5 mr-2" />
                <span className="font-medium">Class</span>
              </div>
              <p className="text-gray-800 font-bold">{searchParams.get('class')}</p>
            </div>
          </div>
        </div>

        {/* Flights List */}
        <div className="space-y-6">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 
                ${selectedFlight?.id === flight.id ? 'ring-2 ring-blue-600 transform scale-102' : 'hover:shadow-xl'}`}
            >
              <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Plane className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-lg font-bold text-gray-800">Flight {flight.flightNumber}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Departure</p>
                      <p className="font-bold text-gray-800">{flight.source.name}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(flight.departureTime).toLocaleTimeString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Arrival</p>
                      <p className="font-bold text-gray-800">{flight.destination.name}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(flight.arrivalTime).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">${flight.cost}</p>
                    <p className="text-gray-500">{searchParams.get('class')} Class</p>
                  </div>
                  
                  <button
                    onClick={() => handleSelectFlight(flight)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 
                      transition-colors flex items-center gap-2 font-medium"
                  >
                    Select Flight
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-6">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSelectionPage;