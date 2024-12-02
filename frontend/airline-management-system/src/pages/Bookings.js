import React, { useState, useEffect } from 'react';
import { RefreshCw, Plus, ChevronDown } from 'lucide-react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    userId: '',
    flightId: '',
    seatsBooked: 1,
    totalPrice: 0
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/bookings');
      const data = await response.json();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBooking = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
      if (!response.ok) throw new Error('Failed to create booking');
      fetchBookings();
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to create booking');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <RefreshCw className="animate-spin h-8 w-8 text-blue-600" />
    </div>
  );

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Flight Bookings</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          New Booking
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Status</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PENDING">Pending</option>
            <option value="CANCELED">Canceled</option>
          </select>
          <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.bookingId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  #{booking.bookingId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.user?.firstname} {booking.user?.lastname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.flightRoute?.flightNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.seatsBooked}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.bookingStatus)}`}>
                    {booking.bookingStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${booking.totalPrice?.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">New Booking</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddBooking(); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">User ID</label>
                  <input
                    type="text"
                    value={newBooking.userId}
                    onChange={(e) => setNewBooking({...newBooking, userId: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Flight ID</label>
                  <input
                    type="text"
                    value={newBooking.flightId}
                    onChange={(e) => setNewBooking({...newBooking, flightId: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Seats</label>
                  <input
                    type="number"
                    value={newBooking.seatsBooked}
                    onChange={(e) => setNewBooking({...newBooking, seatsBooked: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;