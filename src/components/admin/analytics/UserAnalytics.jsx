import React, { useState, useEffect } from 'react';
import { database } from '../../../firebase';
import { ref, get } from 'firebase/database';
import { Line } from 'react-chartjs-2';

const UserAnalytics = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const historyRef = ref(database, 'history');
        const snapshot = await get(historyRef);
        
        if (snapshot.exists()) {
          const userReadings = Object.values(snapshot.val())
            .filter(entry => entry.userId === userId)
            .sort((a, b) => a.timestamp - b.timestamp);

          const chartData = {
            labels: userReadings.map(reading => new Date(reading.timestamp).toLocaleString()),
            datasets: [{
              label: 'SKO Value',
              data: userReadings.map(reading => reading.skoValue),
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          };

          setUserData({
            readings: userReadings,
            chartData
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (!userData) {
    return <div className="text-center py-4">No data available</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'SKO Progress Over Time'
      }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Line options={options} data={userData.chartData} />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700">Total Readings</h4>
          <p className="text-2xl font-bold text-blue-600">{userData.readings.length}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700">Latest SKO</h4>
          <p className="text-2xl font-bold text-green-600">
            {userData.readings[userData.readings.length - 1]?.skoValue || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;