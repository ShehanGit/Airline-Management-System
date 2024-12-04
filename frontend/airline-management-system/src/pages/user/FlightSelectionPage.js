import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plane, Calendar, MapPin, Users } from 'lucide-react';

const FlightSelectionPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

        if (!from || !to || !passengers || !flightClass) {
          throw new Error('Missing required search parameters');
        }

        const response = await fetch(
          `http://localhost:8080/api/routes/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&passengers=${passengers}&flightClass=${flightClass}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch flights');
        }

        const data = await response.json();
        setFlights(data.flights || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [location.search]);

  const handleSelectFlight = (flight) => {
    // Save current search parameters and flight data to localStorage
    const searchData = {
      from: searchParams.get('from'),
      to: searchParams.get('to'),
      passengers: searchParams.get('passengers'),
      class: searchParams.get('class')
    };
    localStorage.setItem('flightSearchData', JSON.stringify(searchData));
    
    // Navigate to passenger page with flight ID
    navigate(`/passenger/${flight.id}`);
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-red-600 text-xl font-bold mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Return to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Flight Search Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500 flex items-center"><MapPin className="h-4 w-4 mr-1" /> From</p>
              <p className="font-medium">{searchParams.get('from')}</p>
            </div>
            <div>
              <p className="text-gray-500 flex items-center"><MapPin className="h-4 w-4 mr-1" /> To</p>
              <p className="font-medium">{searchParams.get('to')}</p>
            </div>
            <div>
              <p className="text-gray-500 flex items-center"><Users className="h-4 w-4 mr-1" /> Passengers</p>
              <p className="font-medium">{searchParams.get('passengers')}</p>
            </div>
            <div>
              <p className="text-gray-500 flex items-center"><Plane className="h-4 w-4 mr-1" /> Class</p>
              <p className="font-medium">{searchParams.get('class')}</p>
            </div>
          </div>
        </div>

        {/* Flight List */}
        {flights.length > 0 ? (
          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-center flex-wrap">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <Plane className="h-6 w-6 text-blue-600" />
                      <span className="text-lg font-bold">{flight.flightNumber}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-sm text-gray-500">Departure</p>
                        <p className="font-medium">{flight.source.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(flight.departureTime).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Arrival</p>
                        <p className="font-medium">{flight.destination.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(flight.arrivalTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <p className="text-3xl font-bold text-blue-600">${flight.cost}</p>
                    <p className="text-gray-500 mb-2">{searchParams.get('class')} Class</p>
                    <button
                      onClick={() => handleSelectFlight(flight)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Select Flight
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-600 mb-4">No flights found for this route.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Modify Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSelectionPage;