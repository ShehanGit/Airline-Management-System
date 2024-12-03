import React, { useState } from 'react';
import { Search, Plane, Calendar, MapPin, Users } from 'lucide-react';

const HomePage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching flights:', { from, to, date, passengers });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to SkyWings Airlines</h1>
        <p className="text-lg text-gray-600">Discover the world with comfort and style</p>
      </div>

      {/* Flight Search Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="pl-10 w-full p-2 border rounded"
                  placeholder="Departure City"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="pl-10 w-full p-2 border rounded"
                  placeholder="Arrival City"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10 w-full p-2 border rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="pl-10 w-full p-2 border rounded"
                  min="1"
                  max="10"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Search className="h-5 w-5" />
            Search Flights
          </button>
        </form>
      </div>

      {/* Featured Destinations */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Paris', 'New York', 'Tokyo'].map((city) => (
            <div key={city} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{city}</h3>
                <p className="text-gray-600">Discover amazing deals</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-xl mb-4">Check-in Online</h3>
          <p className="text-gray-600">Save time at the airport</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-xl mb-4">Flight Status</h3>
          <p className="text-gray-600">Track your flight</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-xl mb-4">Special Offers</h3>
          <p className="text-gray-600">View our latest deals</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;