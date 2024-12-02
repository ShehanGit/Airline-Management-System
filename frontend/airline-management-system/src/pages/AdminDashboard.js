import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Spinner } from '../components/ui/spinner';
import { 
  Users, 
  Plane, 
  Building2, 
  Calendar, 
  CreditCard,
  UserCog,
  Map,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


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

  const StatCard = ({ title, value, icon: Icon, loading }) => (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            {loading ? (
              <div className="mt-2">
                <Spinner className="h-4 w-4" />
              </div>
            ) : (
              <h3 className="text-2xl font-bold mt-1">{value}</h3>
            )}
          </div>
          <Icon className="h-8 w-8 text-blue-500" />
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
    <div className="p-6 bg-gray-50 min-h-screen">
      
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Customers" 
          value={stats.totalCustomers} 
          icon={Users}
          loading={loading}
        />
        <StatCard 
          title="Total Staff" 
          value={stats.totalStaff} 
          icon={UserCog}
          loading={loading}
        />
        <StatCard 
          title="Total Aircraft" 
          value={stats.totalAircrafts} 
          icon={Plane}
          loading={loading}
        />
        <StatCard 
          title="Total Bookings" 
          value={stats.totalBookings} 
          icon={Calendar}
          loading={loading}
        />
        <StatCard 
          title="Frequent Flyers" 
          value={stats.frequentFlyers} 
          icon={CreditCard}
          loading={loading}
        />
        <StatCard 
          title="Airports" 
          value={stats.totalAirports} 
          icon={Building2}
          loading={loading}
        />
      </div>

      {/* Rest of the dashboard components remain the same */}
    </div>
  );
};

export default AdminDashboard;