import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { database } from '../../firebase';
import { ref, get } from 'firebase/database';

function DataHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [usersMap, setUsersMap] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Fetch all users first to create a mapping
        const usersRef = ref(database, 'users');
        const usersSnapshot = await get(usersRef);
        if (usersSnapshot.exists()) {
          const users = usersSnapshot.val();
          setUsersMap(users);
          
          // If we have a specific userId, set the userData
          if (userId && users[userId]) {
            setUserData(users[userId]);
          }
        }

        // Fetch history data
        const historyRef = ref(database, 'history');
        const snapshot = await get(historyRef);
        if (snapshot.exists()) {
          let historyData = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
            userData: usersMap[data.userId] || null
          }));

          // Filter by userId if provided
          if (userId) {
            historyData = historyData.filter(entry => entry.userId === userId);
          }

          setHistory(historyData.sort((a, b) => b.timestamp - a.timestamp));
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {userData ? `Data History for ${userData.username}` : 'Data History'}
        </h1>
        
        {userData && (
          <div className="mb-6 bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-600">Email: {userData.email}</p>
          </div>
        )}
        
        <div className="grid gap-8">
          {history.map((entry) => (
            <div key={entry.id} className="bg-white rounded-lg shadow-md p-6">
              {!userData && (
                <div className="mb-4 pb-4 border-b">
                  <h3 className="font-semibold text-gray-800">{usersMap[entry.userId]?.username || 'Unknown User'}</h3>
                  <p className="text-sm text-gray-600">{usersMap[entry.userId]?.email || 'Unknown Email'}</p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700">Peak Value</h4>
                  <p className="text-2xl font-bold text-blue-600">{entry.peakValue.toFixed(2)} mV</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700">Average Value</h4>
                  <p className="text-2xl font-bold text-green-600">{entry.averageValue.toFixed(2)} mV</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700">SKO Grade</h4>
                  <p className="text-2xl font-bold text-purple-600">{entry.skoValue}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                {new Date(entry.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DataHistory;