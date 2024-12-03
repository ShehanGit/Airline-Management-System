import React, { useState, useEffect } from 'react';
import { RefreshCcw, Edit, Trash2, Plus } from 'lucide-react';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    role: '',
    salary: '',
    shiftStart: '',
    shiftEnd: ''
  });

  // Fetch staff data
  const fetchStaff = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/staff');
      if (!response.ok) throw new Error('Failed to fetch staff data');
      const data = await response.json();
      setStaff(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new staff member
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = currentStaff 
        ? `http://localhost:8080/api/staff/${currentStaff.staffId}`
        : 'http://localhost:8080/api/staff';
      
      const method = currentStaff ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error(`Failed to ${currentStaff ? 'update' : 'add'} staff member`);
      
      await fetchStaff();
      setShowModal(false);
      setCurrentStaff(null);
      setFormData({
        userId: '',
        role: '',
        salary: '',
        shiftStart: '',
        shiftEnd: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete staff member
  const handleDelete = async (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/staff/${staffId}`, {
          method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete staff member');
        
        await fetchStaff();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Open edit modal
  const handleEdit = (staffMember) => {
    setCurrentStaff(staffMember);
    setFormData({
      userId: staffMember.user.id,
      role: staffMember.role,
      salary: staffMember.salary,
      shiftStart: staffMember.shiftStart?.split('T')[0] || '',
      shiftEnd: staffMember.shiftEnd?.split('T')[0] || ''
    });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCcw className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-2xl font-semibold">Staff Management</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Staff
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-6 rounded">
            {error}
          </div>
        )}

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Start</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift End</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staff.map((staffMember) => (
                  <tr key={staffMember.staffId}>
                    <td className="px-6 py-4 whitespace-nowrap">{staffMember.staffId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{staffMember.user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{staffMember.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${staffMember.salary}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{staffMember.shiftStart?.split('T')[0]}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{staffMember.shiftEnd?.split('T')[0]}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(staffMember)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(staffMember.staffId)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {currentStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">User ID</label>
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select role</option>
                    <option value="PILOT">Pilot</option>
                    <option value="CREW">Crew</option>
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="GROUND_SUPPORT">Ground Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Salary</label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Shift Start</label>
                  <input
                    type="date"
                    name="shiftStart"
                    value={formData.shiftStart}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Shift End</label>
                  <input
                    type="date"
                    name="shiftEnd"
                    value={formData.shiftEnd}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setCurrentStaff(null);
                    setFormData({
                      userId: '',
                      role: '',
                      salary: '',
                      shiftStart: '',
                      shiftEnd: ''
                    });
                  }}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {currentStaff ? 'Save Changes' : 'Add Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;