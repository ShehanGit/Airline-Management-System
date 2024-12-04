import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Building2, AlertCircle, X, Check } from 'lucide-react';

// Custom Alert Component
const Alert = ({ type = 'error', children, onClose }) => {
  const colors = {
    error: 'bg-red-50 border-red-400 text-red-700',
    success: 'bg-green-50 border-green-400 text-green-700'
  };
  
  return (
    <div className={`${colors[type]} border-l-4 p-4 mb-6 flex items-start justify-between`}>
      <div className="flex items-center">
        {type === 'error' ? (
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
        ) : (
          <Check className="h-5 w-5 text-green-400 mr-2" />
        )}
        <p>{children}</p>
      </div>
      {onClose && (
        <button 
          onClick={onClose} 
          className={`${type === 'error' ? 'text-red-400 hover:text-red-600' : 'text-green-400 hover:text-green-600'}`}
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

const PaymentMethod = ({ icon: Icon, title, description, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`p-4 border rounded-lg cursor-pointer transition-all ${
      selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'
    }`}
  >
    <div className="flex items-center space-x-3">
      <div className={`${selected ? 'text-blue-500' : 'text-gray-400'}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

const PaymentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [flightDetails, setFlightDetails] = useState(null);
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  useEffect(() => {
    // Load booking details from localStorage
    const storedDetails = localStorage.getItem('bookingDetails');
    if (storedDetails) {
      const details = JSON.parse(storedDetails);
      setBookingDetails(details);
      
      // Fetch flight details
      fetchFlightDetails(details.flightId);
    }
  }, []);

  const fetchFlightDetails = async (flightId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/routes/${flightId}`);
      if (!response.ok) throw new Error('Failed to fetch flight details');
      const data = await response.json();
      setFlightDetails(data);
    } catch (error) {
      setError('Failed to load flight details');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatCreditCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCreditCardNumber(e.target.value);
    setPaymentData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Create payment record
      const paymentResponse = await fetch('http://localhost:8080/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: bookingDetails.bookingId,
          amountPaid: flightDetails.cost * bookingDetails.passengerCount,
          paymentMethod,
          paymentStatus: 'COMPLETED'
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Payment failed');
      }

      setSuccess('Payment processed successfully!');
      
      // Redirect to confirmation page after a short delay
      setTimeout(() => {
        navigate('/booking/confirmation');
      }, 2000);
    } catch (error) {
      setError(error.message || 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingDetails || !flightDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {error && <Alert type="error" onClose={() => setError('')}>{error}</Alert>}
          {success && <Alert type="success" onClose={() => setSuccess('')}>{success}</Alert>}

          <h1 className="text-2xl font-bold mb-6">Payment Details</h1>

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-3">Booking Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Flight Number</p>
                <p className="font-medium">{flightDetails.flightNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Class</p>
                <p className="font-medium">{bookingDetails.class}</p>
              </div>
              <div>
                <p className="text-gray-600">Passengers</p>
                <p className="font-medium">{bookingDetails.passengerCount}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Amount</p>
                <p className="font-semibold text-lg text-blue-600">
                  ${(flightDetails.cost * bookingDetails.passengerCount).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Select Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PaymentMethod
                icon={CreditCard}
                title="Credit Card"
                description="Pay securely with your credit card"
                selected={paymentMethod === 'CREDIT_CARD'}
                onClick={() => setPaymentMethod('CREDIT_CARD')}
              />
              <PaymentMethod
                icon={Building2}
                title="Bank Transfer"
                description="Direct bank transfer"
                selected={paymentMethod === 'BANK_TRANSFER'}
                onClick={() => setPaymentMethod('BANK_TRANSFER')}
              />
              <PaymentMethod
                icon={Wallet}
                title="Digital Wallet"
                description="Pay with PayPal or other digital wallets"
                selected={paymentMethod === 'DIGITAL_WALLET'}
                onClick={() => setPaymentMethod('DIGITAL_WALLET')}
              />
            </div>
          </div>

          {/* Payment Form */}
          {paymentMethod === 'CREDIT_CARD' && (
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength="19"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">Card Holder Name</label>
                  <input
                    type="text"
                    name="cardHolder"
                    value={paymentData.cardHolder}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength="5"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength="3"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="saveCard"
                  name="saveCard"
                  checked={paymentData.saveCard}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  disabled={loading}
                />
                <label htmlFor="saveCard" className="ml-2 text-sm text-gray-600">
                  Save card for future payments
                </label>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : `Pay $${(flightDetails.cost * bookingDetails.passengerCount).toFixed(2)}`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;