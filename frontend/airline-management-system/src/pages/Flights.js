import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, Plane } from 'lucide-react';
import axios from 'axios';

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      // Using axios and the full backend URL
      const response = await axios.get('http://localhost:8080/api/routes');
      setFlights(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching flights:', err);
      setError(err.message || 'Failed to fetch flights');
      setLoading(false);
    }
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const getFlightStatus = (status) => {
    if (!status) return null;
    const statusColors = {
      ON_TIME: 'bg-green-100 text-green-800',
      DELAYED: 'bg-yellow-100 text-yellow-800',
      CANCELED: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-sm ${statusColors[status]}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  const filteredFlights = flights.filter((flight) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      flight.flightNumber?.toLowerCase().includes(searchLower) ||
      flight.source?.name?.toLowerCase().includes(searchLower) ||
      flight.destination?.name?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading flights...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Plane className="h-6 w-6" />
            Available Flights
          </h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search flights by number, source, or destination"
                className="pl-8 pr-4 py-2 w-full border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flight Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available Seats
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFlights.map((flight) => (
                  <tr key={flight.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {flight.flightNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {flight.source?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {flight.destination?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDateTime(flight.departureTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDateTime(flight.arrivalTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getFlightStatus(flight.flightStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      <span className="capitalize">{flight.flightType?.toLowerCase()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {flight.totalSeats}
                    </td>
                  </tr>
                ))}
                {filteredFlights.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      No flights found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;