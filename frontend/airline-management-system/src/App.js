import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Bookings from './pages/Bookings';
import Customers from './pages/Customers';
import Aircraft from './pages/Aircraft';
import AdminDashboard from './pages/AdminDashboard';
import StaffManagement from './pages/Staff';  // Add this import

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          
          {/* Main Routes */}
          <Route path="/flights" element={<Flights />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/aircraft" element={<Aircraft />} />
          <Route path="/staff" element={<StaffManagement />} />  {/* Add this route */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;