import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Mail, Key, AlertCircle, X } from 'lucide-react';

// Custom Alert Component
const Alert = ({ children, onClose }) => (
  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 flex items-start justify-between">
    <div className="flex items-center">
      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
      <p className="text-red-700">{children}</p>
    </div>
    {onClose && (
      <button onClick={onClose} className="text-red-400 hover:text-red-600">
        <X className="h-5 w-5" />
      </button>
    )}
  </div>
);

const PassengerPage = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState(null);
  const [activeForm, setActiveForm] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // User registration fields
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'USER',
    // Customer fields
    phoneNumber: '',
    address: '',
    passportNumber: '',
    nationality: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    const data = localStorage.getItem('flightSearchData');
    if (data) {
      try {
        setSearchData(JSON.parse(data));
      } catch (err) {
        console.error('Error parsing flight search data:', err);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetError = () => setError('');

  const handleUserLookup = async () => {
    resetError();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/users/email/${formData.email}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError('User not found. Please register.');
          setActiveForm('register');
        } else {
          throw new Error('Error looking up user');
        }
        return;
      }
      
      const userData = await response.json();
      setFormData(prev => ({
        ...prev,
        ...userData,
        id: userData.id,
        password: ''
      }));
      
      // Check if customer profile exists
      const customerResponse = await fetch(`http://localhost:8080/customers/user/${userData.id}`);
      if (customerResponse.ok) {
        const customerData = await customerResponse.json();
        handleBookingProcess(userData.id);
      } else {
        setActiveForm('customer');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during user lookup');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    resetError();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const userData = await response.json();
      setFormData(prev => ({
        ...prev,
        id: userData.id
      }));
      setActiveForm('customer');
    } catch (error) {
      setError(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    resetError();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            id: formData.id
          },
          firstName: formData.firstname,
          lastName: formData.lastname,
          passportNumber: formData.passportNumber,
          address: formData.address,
          country: formData.nationality,
          loyaltyPoints: 0,
          frequentFlyer: false
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Customer profile creation failed');
      }
      
      const customerData = await response.json();
      handleBookingProcess(formData.id);
    } catch (error) {
      setError(error.message || 'Failed to create customer profile');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingProcess = (userId) => {
    localStorage.setItem('bookingDetails', JSON.stringify({
      userId,
      flightId,
      passengerCount: searchData?.passengers,
      class: searchData?.class
    }));
    navigate(`/booking/payment`);
  };




  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Error Alert */}
          {error && (
            <Alert onClose={resetError}>
              {error}
            </Alert>
          )}

          {/* Form Selection Tabs */}
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setActiveForm('login')}
              className={`px-4 py-2 ${activeForm === 'login' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              disabled={loading}
            >
              Find User
            </button>
            <button
              onClick={() => setActiveForm('register')}
              className={`px-4 py-2 ${activeForm === 'register' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              disabled={loading}
            >
              Register New User
            </button>
            <button
              onClick={() => setActiveForm('customer')}
              className={`px-4 py-2 ${activeForm === 'customer' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              disabled={loading || !formData.id}
            >
              Create Customer Profile
            </button>
          </div>

          {/* Find User Form */}
          {activeForm === 'login' && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-6">Find Existing User</h2>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email to check existing user"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border rounded"
                    disabled={loading}
                  />
                </div>
                <button
                  onClick={handleUserLookup}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                  disabled={loading || !formData.email}
                >
                  {loading ? 'Searching...' : 'Find User'}
                </button>
              </div>
            </div>
          )}

          {/* Register User Form */}
          {activeForm === 'register' && (
            <form onSubmit={handleRegisterUser}>
              <h2 className="text-2xl font-bold mb-6">Register New User</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 p-2 border rounded"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 p-2 border rounded"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 p-2 border rounded"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">Password</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 p-2 border rounded"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Register User'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Create Customer Form */}
          {activeForm === 'customer' && (
            <form onSubmit={handleCreateCustomer}>
              <h2 className="text-2xl font-bold mb-6">Create Customer Profile</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                    rows="3"
                    disabled={loading}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">Passport Number</label>
                    <input
                      type="text"
                      name="passportNumber"
                      value={formData.passportNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                    disabled={loading}
                  >
                    {loading ? 'Creating Profile...' : 'Create Customer Profile'}
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
              disabled={loading}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerPage;