import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'PILOT',
    salary: '',
    shiftStart: '',
    shiftEnd: '',
    userId: ''
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/staff');
      const data = await response.json();
      setStaff(data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `/api/staff/${currentStaff.staffId}` : '/api/staff';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user: { id: parseInt(formData.userId) }
        }),
      });

      if (response.ok) {
        fetchStaff();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error saving staff:', error);
    }
  };

  const handleDelete = async (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        const response = await fetch(`/api/staff/${staffId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchStaff();
        }
      } catch (error) {
        console.error('Error deleting staff:', error);
      }
    }
  };

  const handleEdit = (staffMember) => {
    setCurrentStaff(staffMember);
    setFormData({
      firstName: staffMember.firstName || '',
      lastName: staffMember.lastName || '',
      role: staffMember.role || 'PILOT',
      salary: staffMember.salary || '',
      shiftStart: staffMember.shiftStart ? new Date(staffMember.shiftStart).toISOString().slice(0, 16) : '',
      shiftEnd: staffMember.shiftEnd ? new Date(staffMember.shiftEnd).toISOString().slice(0, 16) : '',
      userId: staffMember.user?.id || ''
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentStaff(null);
    setFormData({
      firstName: '',
      lastName: '',
      role: 'PILOT',
      salary: '',
      shiftStart: '',
      shiftEnd: '',
      userId: ''
    });
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-xl font-semibold">Staff Management</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </button>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Start</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift End</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staff.map((staffMember) => (
                  <tr key={staffMember.staffId}>
                    <td className="px-6 py-4 whitespace-nowrap">{`${staffMember.firstName} ${staffMember.lastName}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{staffMember.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${staffMember.salary}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(staffMember.shiftStart).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(staffMember.shiftEnd).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(staffMember)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(staffMember.staffId)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {isEditing ? 'Edit Staff Member' : 'Add New Staff Member'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="PILOT">Pilot</option>
                  <option value="CREW">Crew</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="GROUND_SUPPORT">Ground Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">User ID</label>
                <input
                  type="number"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Shift Start</label>
                  <input
                    type="datetime-local"
                    name="shiftStart"
                    value={formData.shiftStart}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Shift End</label>
                  <input
                    type="datetime-local"
                    name="shiftEnd"
                    value={formData.shiftEnd}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {isEditing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffPage;