import React, { useState, useEffect } from 'react';
import { RefreshCw, UserPlus, Search, Star } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    firstName: '',
    lastName: '',
    passportNumber: '',
    address: '',
    country: '',
    userId: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:8080/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async () => {
    try {
      const response = await fetch('http://localhost:8080/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer)
      });
      if (!response.ok) throw new Error('Failed to create customer');
      fetchCustomers();
      setShowAddModal(false);
      setNewCustomer({
        firstName: '',
        lastName: '',
        passportNumber: '',
        address: '',
        country: '',
        userId: ''
      });
    } catch (err) {
      setError('Failed to create customer');
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        const response = await fetch(`http://localhost:8080/customers/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete customer');
        fetchCustomers();
      } catch (err) {
        setError('Failed to delete customer');
      }
    }
  };

  const filteredCustomers = customers.filter(customer => 
    customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.passportNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <UserPlus className="h-5 w-5" />
            Add Customer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.customerId} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {customer.firstName} {customer.lastName}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Passport: {customer.passportNumber}
                </p>
              </div>
              {customer.frequentFlyer && (
                <div className="flex items-center text-yellow-600">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-sm ml-1">Frequent Flyer</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-gray-700">{customer.address || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Country</p>
                <p className="text-gray-700">{customer.country || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Loyalty Points</p>
                <p className="text-gray-700">{customer.loyaltyPoints || 0} points</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleDeleteCustomer(customer.customerId)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddCustomer(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={newCustomer.firstName}
                  onChange={(e) => setNewCustomer({...newCustomer, firstName: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={newCustomer.lastName}
                  onChange={(e) => setNewCustomer({...newCustomer, lastName: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Passport Number</label>
                <input
                  type="text"
                  value={newCustomer.passportNumber}
                  onChange={(e) => setNewCustomer({...newCustomer, passportNumber: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  value={newCustomer.country}
                  onChange={(e) => setNewCustomer({...newCustomer, country: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User ID</label>
                <input
                  type="text"
                  value={newCustomer.userId}
                  onChange={(e) => setNewCustomer({...newCustomer, userId: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
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
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;