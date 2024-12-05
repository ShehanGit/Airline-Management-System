import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UserLayout from './components/UserLayout';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminFlights from './pages/Flights';
import AdminBookings from './pages/Bookings';
import Customers from './pages/Customers';
import Aircraft from './pages/Aircraft';
import StaffManagement from './pages/Staff';

// User Pages
import HomePage from './pages/user/HomePage';
import FlightSelectionPage from './pages/user/FlightSelectionPage';
import RegisterCustomer from './pages/user/CustomerRegistration';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes - with sidebar */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="flights" element={<AdminFlights />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="customers" element={<Customers />} />
          <Route path="aircraft" element={<Aircraft />} />
          <Route path="staff" element={<StaffManagement />} />
          
          
        </Route>

        {/* User Routes - with navbar */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="flights/select" element={<FlightSelectionPage />} />
          <Route path="passengers" element={<RegisterCustomer />} />
          

        </Route>
      </Routes>
    </Router>
  );
}

export default App;