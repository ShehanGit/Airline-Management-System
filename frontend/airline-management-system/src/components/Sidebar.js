import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  Plane, 
  Building2, 
  Users,
  Calendar,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  UserCog,
  BarChart3
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: HomeIcon,
      path: '/admin/AdminDashboard'
    },
    {
      title: 'Flight Management',
      icon: Plane,
      path: '/admin/flights'
    },
    {
      title: 'Bookings',
      icon: Calendar,
      path: '/admin/bookings'
    },
    {
      title: 'Customers',
      icon: Users,
      path: '/admin/customers'
    },
    {
      title: 'Aircraft',
      icon: Plane,
      path: '/admin/aircraft'
    },
    {
      title: 'Staff',
      icon: UserCog,
      path: '/admin/staff'
    },
    {
      title: 'Reports',
      icon: BarChart3,
      path: '/admin/reports'
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/admin/settings'
    }
  ];

  // New function to handle navigation to home page
  const handleHomeNavigation = () => {
    navigate('/');
  };

  return (
    <div className={`h-screen bg-white shadow-lg relative transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-3 border-b">
        {!isCollapsed && (
          <div 
            className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
            onClick={handleHomeNavigation}
          >
            <Plane className="w-6 h-6 text-blue-500 hover:text-blue-600" />
            <span className="ml-2 font-semibold text-lg">AirlineMS</span>
          </div>
        )}
        {isCollapsed && (
          <Plane 
            className="w-6 h-6 text-blue-500 hover:text-blue-600 cursor-pointer ml-1"
            onClick={handleHomeNavigation}
          />
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Navigation Items */}
      <div className="py-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-3 py-2 cursor-pointer
              ${location.pathname === item.path ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-50'}
              ${!isCollapsed ? 'mx-3' : 'mx-2'} rounded-lg transition-all duration-200`}
            onClick={() => navigate(item.path)}
          >
            {item.icon && (
              <item.icon className={`${location.pathname === item.path ? 'text-white' : 'text-gray-500'} 
                ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-2'}`}
              />
            )}
            {!isCollapsed && <span>{item.title}</span>}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full border-t">
        <div
          className="flex items-center px-3 py-4 cursor-pointer hover:bg-red-50 text-red-600"
          onClick={() => navigate('/logout')}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;