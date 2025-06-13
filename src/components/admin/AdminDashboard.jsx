import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../firebase';
import { ref, query, orderByChild, limitToLast, onValue } from 'firebase/database';

function AdminDashboard() {
  const { user } = useAuth();
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReadings: 0,
    activeSessions: 0
  });

  useEffect(() => {
    // Fetch recent activity from history
    const historyRef = query(
      ref(database, 'history'),
      orderByChild('timestamp'),
      limitToLast(10)
    );

    const unsubscribe = onValue(historyRef, (snapshot) => {
      if (snapshot.exists()) {
        const historyData = Object.entries(snapshot.val())
          .map(([id, data]) => ({ id, ...data }))
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 5);

        // Fetch user data for each activity
        const usersRef = ref(database, 'users');
        onValue(usersRef, (usersSnapshot) => {
          if (usersSnapshot.exists()) {
            const users = usersSnapshot.val();
            const activities = historyData.map(activity => ({
              ...activity,
              username: users[activity.userId]?.username || 'Unknown User',
              type: 'emg_reading'
            }));
            setRecentActivity(activities);

            // Calculate stats
            const totalUsers = Object.keys(users).length;
            const totalReadings = Object.keys(snapshot.val()).length;
            const activeSessions = activities.filter(a => 
              Date.now() - a.timestamp < 300000 // Active in last 5 minutes
            ).length;

            setStats({
              totalUsers,
              totalReadings,
              activeSessions
            });
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'emg_reading':
        return 'fa-wave-square';
      case 'user_register':
        return 'fa-user-plus';
      default:
        return 'fa-circle';
    }
  };

  const getActivityMessage = (activity) => {
    switch (activity.type) {
      case 'emg_reading':
        return `${activity.username} recorded EMG reading (${activity.skoValue} MSS)`;
      case 'user_register':
        return `${activity.username} registered`;
      default:
        return `${activity.username} performed an action`;
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

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
                    <p className="text-2xl font-bold text-[#00A79D]">{stats.totalUsers}</p>
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
                    <p className="text-2xl font-bold text-[#2B3990]">{stats.totalReadings}</p>
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
                    <p className="text-2xl font-bold text-[#00A79D]">{stats.activeSessions}</p>
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
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-[#00A79D]/10 flex items-center justify-center">
                      <i className={`fas ${getActivityIcon(activity.type)} text-[#00A79D]`}></i>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {getActivityMessage(activity)}
                      </p>
                      <p className="text-xs text-gray-500">{getTimeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <i className="fas fa-clock text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;