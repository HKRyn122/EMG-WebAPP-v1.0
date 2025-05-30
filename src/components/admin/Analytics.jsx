import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, get } from 'firebase/database';
import UserList from './analytics/UserList';
import UserAnalytics from './analytics/UserAnalytics';

function Analytics() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [analyticsStats, setAnalyticsStats] = useState({
    totalUsers: 0,
    totalReadings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsStats = async () => {
      try {
        // Fetch users
        const usersRef = ref(database, 'users');
        const usersSnapshot = await get(usersRef);
        const users = usersSnapshot.exists() ? Object.keys(usersSnapshot.val()).length : 0;

        // Fetch history
        const historyRef = ref(database, 'history');
        const historySnapshot = await get(historyRef);
        const history = historySnapshot.exists() ? Object.values(historySnapshot.val()) : [];

        // Calculate statistics
        const totalReadings = history.length;

        setAnalyticsStats({
          totalUsers: users,
          totalReadings
        });
      } catch (error) {
        console.error('Error fetching analytics stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsStats();
  }, []);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  const handleBack = () => {
    setSelectedUserId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 py-8">
      <div className="container mx-auto px-4">
        {!selectedUserId && (
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Analytics Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">{analyticsStats.totalUsers}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Readings</h3>
                <p className="text-3xl font-bold text-green-600">{analyticsStats.totalReadings}</p>
              </div>
            </div>
          </div>
        )}

        {selectedUserId ? (
          <>
            <button
              onClick={handleBack}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to User List
            </button>
            <UserAnalytics userId={selectedUserId} />
          </>
        ) : (
          <UserList onUserSelect={handleUserSelect} />
        )}
      </div>
    </div>
  );
}

export default Analytics