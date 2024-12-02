import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Spinner } from '../components/ui/spinner';
import Sidebar from '../components/Sidebar';
import { 
  Users, 
  Plane, 
  Building2, 
  Calendar, 
  CreditCard,
  UserCog,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalStaff: 0,
    totalAircrafts: 0,
    totalBookings: 0,
    frequentFlyers: 0,
    totalAirports: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        customersResponse,
        staffResponse,
        aircraftResponse,
        bookingsResponse,
        airportsResponse
      ] = await Promise.all([
        fetch('http://localhost:8080/customers'),
        fetch('http://localhost:8080/api/staff'),
        fetch('http://localhost:8080/api/aircrafts'),
        fetch('http://localhost:8080/api/bookings'),
        fetch('http://localhost:8080/api/airports')
      ]);

      // Check if any response failed
      const responses = [
        customersResponse,
        staffResponse,
        aircraftResponse,
        bookingsResponse,
        airportsResponse
      ];

      for (const response of responses) {
        if (!response.ok) {
          throw new Error(`API call failed: ${response.statusText}`);
        }
      }

      const [
        customers,
        staff,
        aircrafts,
        bookings,
        airports
      ] = await Promise.all(responses.map(r => r.json()));

      setStats({
        totalCustomers: customers.length,
        totalStaff: staff.length,
        totalAircrafts: aircrafts.length,
        totalBookings: bookings.length,
        frequentFlyers: customers.filter(c => c.frequentFlyer).length,
        totalAirports: airports.length,
      });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, loading, color }) => (
    <Card className="relative overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ backgroundColor: color }}
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            {loading ? (
              <div className="mt-2">
                <Spinner className="h-4 w-4" style={{ color: color }} />
              </div>
            ) : (
              <h3 className="text-2xl font-bold mt-1" style={{ color: color }}>
                {value.toLocaleString()}
              </h3>
            )}
          </div>
          <div 
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="h-8 w-8" style={{ color: color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading dashboard: {error}
            <button 
              onClick={fetchDashboardData}
              className="ml-4 text-sm underline"
            >
              Try Again
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome to your airline management portal</p>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total Customers" 
            value={stats.totalCustomers} 
            icon={Users}
            loading={loading}
            color="#3B82F6" // Blue
          />
          <StatCard 
            title="Total Staff" 
            value={stats.totalStaff} 
            icon={UserCog}
            loading={loading}
            color="#10B981" // Green
          />
          <StatCard 
            title="Total Aircraft" 
            value={stats.totalAircrafts} 
            icon={Plane}
            loading={loading}
            color="#6366F1" // Indigo
          />
          <StatCard 
            title="Total Bookings" 
            value={stats.totalBookings} 
            icon={Calendar}
            loading={loading}
            color="#F59E0B" // Amber
          />
          <StatCard 
            title="Frequent Flyers" 
            value={stats.frequentFlyers} 
            icon={CreditCard}
            loading={loading}
            color="#EC4899" // Pink
          />
          <StatCard 
            title="Airports" 
            value={stats.totalAirports} 
            icon={Building2}
            loading={loading}
            color="#8B5CF6" // Purple
          />
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['Add Flight', 'New Booking', 'Register Staff', 'View Reports'].map((action, index) => (
              <button
                key={index}
                className="py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg
                          transition-colors duration-200 text-sm font-medium"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;