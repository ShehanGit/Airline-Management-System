import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-blue-600">AirlineSystem</span>
              </Link>
              
              {/* Navigation Links */}
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium">
                  Home
                </Link>
                <Link to="/flights" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
                  Flights
                </Link>
                <Link to="/bookings" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
                  My Bookings
                </Link>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <p className="text-gray-300">Your trusted airline partner for seamless travel experiences.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
                <li><Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
                <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-gray-300">Email: support@airline.com</p>
              <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; 2024 Airline Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;