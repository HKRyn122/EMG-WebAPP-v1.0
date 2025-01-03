import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {user?.email}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Management Card */}
          <Link 
            to="/admin/users" 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="text-blue-600 text-3xl mb-4">
              <i className="fas fa-users"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">User Management</h2>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </Link>

          {/* Analytics Card */}
          <Link 
            to="/admin/analytics" 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="text-blue-600 text-3xl mb-4">
              <i className="fas fa-chart-line"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Analytics</h2>
            <p className="text-gray-600">View user analytics and add notes</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;