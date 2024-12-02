import React, { useState, useEffect } from 'react';
import { RefreshCw, Plus, Edit, Trash2 } from 'lucide-react';

const Aircraft = () => {
  const [aircraft, setAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [formData, setFormData] = useState({
    aircraftModel: '',
    manufacturer: '',
    capacity: '',
    maintenanceDate: '',
    aircraftStatus: 'IN_SERVICE'
  });

  useEffect(() => {
    fetchAircraft();
  }, []);

  const fetchAircraft = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/aircrafts');
      const data = await response.json();
      setAircraft(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch aircraft');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedAircraft 
        ? `http://localhost:8080/api/aircrafts/${selectedAircraft.aircraftId}`
        : 'http://localhost:8080/api/aircrafts';
      const method = selectedAircraft ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to save aircraft');
      
      fetchAircraft();
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this aircraft?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/aircrafts/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete aircraft');
        fetchAircraft();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (aircraft) => {
    setSelectedAircraft(aircraft);
    setFormData({
      aircraftModel: aircraft.aircraftModel,
      manufacturer: aircraft.manufacturer,
      capacity: aircraft.capacity,
      maintenanceDate: aircraft.maintenanceDate?.split('T')[0] || '',
      aircraftStatus: aircraft.aircraftStatus
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setSelectedAircraft(null);
    setFormData({
      aircraftModel: '',
      manufacturer: '',
      capacity: '',
      maintenanceDate: '',
      aircraftStatus: 'IN_SERVICE'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'IN_SERVICE': return 'bg-green-100 text-green-800';
      case 'UNDER_MAINTENANCE': return 'bg-yellow-100 text-yellow-800';
      case 'RETIRED': return 'bg-red-100 text-red-800';
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
        <h1 className="text-2xl font-bold">Aircraft Fleet</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Aircraft
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintenance Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {aircraft.map((plane) => (
              <tr key={plane.aircraftId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{plane.aircraftModel}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plane.manufacturer}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plane.capacity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(plane.maintenanceDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(plane.aircraftStatus)}`}>
                    {plane.aircraftStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(plane)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(plane.aircraftId)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {selectedAircraft ? 'Edit Aircraft' : 'Add New Aircraft'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Aircraft Model</label>
                <input
                  type="text"
                  value={formData.aircraftModel}
                  onChange={(e) => setFormData({...formData, aircraftModel: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                <input
                  type="text"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Maintenance Date</label>
                <input
                  type="date"
                  value={formData.maintenanceDate}
                  onChange={(e) => setFormData({...formData, maintenanceDate: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={formData.aircraftStatus}
                  onChange={(e) => setFormData({...formData, aircraftStatus: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="IN_SERVICE">In Service</option>
                  <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                  <option value="RETIRED">Retired</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {selectedAircraft ? 'Update' : 'Add'} Aircraft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aircraft;