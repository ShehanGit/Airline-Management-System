import React, { useState } from 'react';
import { Search, Plane, Calendar, MapPin, Users } from 'lucide-react';
import homeImage from '../../images/homeImage1.jpg';

const HomePage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching flights:', { from, to, date, passengers });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-screen min-h-[600px] bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${homeImage})`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40">
          {/* Changed justify-center to justify-start and added pt-48 */}
          <div className="container mx-auto px-4 h-full flex flex-col justify-start pt-36 items-center text-white">
            <h1 className="text-5xl font-bold mb-6 text-center">
              Welcome to SkyWings Airlines
            </h1>
            {/* Increased mb-12 to mb-24 for more space */}
            <p className="text-xl mb-24 text-center">
              Discover the world with comfort and style
            </p>

            {/* Flight Search Form - added mt-20 for additional spacing */}
            <div className="w-full max-w-4xl bg-white/95 p-8 rounded-lg shadow-2xl mt-18">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">From</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Departure City"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">To</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Arrival City"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Passengers</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 text-lg font-medium"
                >
                  <Search className="h-5 w-5" />
                  Search Flights
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Featured Destinations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { city: 'Paris', image: '/api/placeholder/400/300', price: 'from $599' },
              { city: 'New York', image: '/api/placeholder/400/300', price: 'from $499' },
              { city: 'Tokyo', image: '/api/placeholder/400/300', price: 'from $799' }
            ].map((destination) => (
              <div key={destination.city} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
                <div className="h-48 bg-gray-200">
                  <img
                    src={destination.image}
                    alt={destination.city}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{destination.city}</h3>
                  <p className="text-gray-600 mb-4">Discover amazing deals</p>
                  <p className="text-blue-600 font-bold">{destination.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Check-in Online', description: 'Save time at the airport', icon: Plane },
            { title: 'Flight Status', description: 'Track your flight', icon: Search },
            { title: 'Special Offers', description: 'View our latest deals', icon: Calendar }
          ].map((item) => (
            <div key={item.title} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <item.icon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-xl mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;