import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plane, 
  MapPin, 
  Calendar, 
  CreditCard, 
  UserCog,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const mockData = {
  bookings: [
    { month: 'Jan', count: 65 },
    { month: 'Feb', count: 85 },
    { month: 'Mar', count: 78 },
    { month: 'Apr', count: 99 },
    { month: 'May', count: 115 },
    { month: 'Jun', count: 122 }
  ],
  stats: {
    totalCustomers: 12453,
    totalFlights: 243,
    activeBookings: 1123,
    revenue: 845232
  }
};

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`${isSidebarOpen ? 'block' : 'hidden'} font-bold text-xl text-blue-600`}>
            Admin Panel
          </h1>
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center p-3 rounded-lg transition-colors
                  ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Users size={20} />
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('flights')}
                className={`w-full flex items-center p-3 rounded-lg transition-colors
                  ${activeTab === 'flights' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Plane size={20} />
                {isSidebarOpen && <span className="ml-3">Flights</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('airports')}
                className={`w-full flex items-center p-3 rounded-lg transition-colors
                  ${activeTab === 'airports' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <MapPin size={20} />
                {isSidebarOpen && <span className="ml-3">Airports</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center p-3 rounded-lg transition-colors
                  ${activeTab === 'bookings' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Calendar size={20} />
                {isSidebarOpen && <span className="ml-3">Bookings</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center p-3 rounded-lg transition-colors
                  ${activeTab === 'payments' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <CreditCard size={20} />
                {isSidebarOpen && <span className="ml-3">Payments</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('staff')}
                className={`w-full flex items-center p-3 rounded-lg transition-colors
                  ${activeTab === 'staff' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <UserCog size={20} />
                {isSidebarOpen && <span className="ml-3">Staff</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-2">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent border-none focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="/api/placeholder/32/32"
                  alt="Admin"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockData.stats.totalCustomers}</div>
                <p className="text-xs text-gray-500">+20.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Flights</CardTitle>
                <Plane className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockData.stats.totalFlights}</div>
                <p className="text-xs text-gray-500">+12 since last hour</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockData.stats.activeBookings}</div>
                <p className="text-xs text-gray-500">+42.6% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${mockData.stats.revenue.toLocaleString()}</div>
                <p className="text-xs text-gray-500">+18.2% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.bookings}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#2563eb" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New booking completed</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;