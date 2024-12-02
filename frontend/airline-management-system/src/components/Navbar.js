import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">Airline Management</Link>
          <div className="flex space-x-4">
            <Link to="/flights" className="hover:text-blue-200">Flights</Link>
            <Link to="/bookings" className="hover:text-blue-200">Bookings</Link>
            <Link to="/customers" className="hover:text-blue-200">Customers</Link>
            <Link to="/aircraft" className="hover:text-blue-200">Aircraft</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;