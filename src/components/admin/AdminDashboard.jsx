import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="medical-card mb-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <img src="/V3 1200-01.png" alt="Logo" className="h-12 mr-6" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600 mt-1">Welcome back, {user?.email}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="stats-card bg-gradient-to-br from-[#00A79D]/5 to-transparent">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#00A79D]/10 flex items-center justify-center">
                    <i className="fas fa-users text-[#00A79D] text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
                    <p className="text-2xl font-bold text-[#00A79D]">247</p>
                  </div>
                </div>
              </div>

              <div className="stats-card bg-gradient-to-br from-[#2B3990]/5 to-transparent">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#2B3990]/10 flex items-center justify-center">
                    <i className="fas fa-chart-line text-[#2B3990] text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-600">Total Readings</h3>
                    <p className="text-2xl font-bold text-[#2B3990]">1,892</p>
                  </div>
                </div>
              </div>

              <div className="stats-card bg-gradient-to-br from-[#00A79D]/5 to-transparent">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#00A79D]/10 flex items-center justify-center">
                    <i className="fas fa-user-md text-[#00A79D] text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-600">Active Sessions</h3>
                    <p className="text-2xl font-bold text-[#00A79D]">18</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                to="/admin/users" 
                className="medical-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-[#00A79D]/10 flex items-center justify-center">
                    <i className="fas fa-users-cog text-2xl text-[#00A79D]"></i>
                  </div>
                  <div className="ml-6">
                    <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                    <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-[#00A79D]">
                  <span className="text-sm font-medium">Manage Users</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </Link>

              <Link 
                to="/admin/analytics" 
                className="medical-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-[#2B3990]/10 flex items-center justify-center">
                    <i className="fas fa-chart-bar text-2xl text-[#2B3990]"></i>
                  </div>
                  <div className="ml-6">
                    <h2 className="text-xl font-bold text-gray-900">Analytics</h2>
                    <p className="text-gray-600 mt-1">View detailed analytics and reports</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-[#2B3990]">
                  <span className="text-sm font-medium">View Analytics</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </Link>
            </div>
          </div>

          <div className="medical-card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#00A79D]/10 flex items-center justify-center">
                    <i className="fas fa-user-circle text-[#00A79D]"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">New user registered</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;