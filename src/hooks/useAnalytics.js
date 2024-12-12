import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalReadings: 0,
    averageSKO: 0,
    userActivity: [],
    skoDistribution: {
      '0-1': 0,
      '2-3': 0,
      '4': 0,
      '5': 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch users
        const usersRef = ref(database, 'users');
        const usersSnapshot = await get(usersRef);
        const users = usersSnapshot.exists() ? usersSnapshot.val() : {};
        const totalUsers = Object.keys(users).length;

        // Fetch history
        const historyRef = ref(database, 'history');
        const historySnapshot = await get(historyRef);
        const historyData = historySnapshot.exists() ? Object.values(historySnapshot.val()) : [];

        // Calculate analytics
        const totalReadings = historyData.length;

        // Calculate average SKO
        const totalSKO = historyData.reduce((acc, entry) => {
          const sko = parseInt(entry.skoValue);
          return acc + (isNaN(sko) ? 0 : sko);
        }, 0);
        const averageSKO = totalReadings > 0 ? totalSKO / totalReadings : 0;

        // Group readings by user
        const userReadings = {};
        historyData.forEach(entry => {
          if (!userReadings[entry.userId]) {
            userReadings[entry.userId] = {
              username: users[entry.userId]?.username || 'Unknown User',
              email: users[entry.userId]?.email || 'Unknown Email',
              readings: []
            };
          }
          userReadings[entry.userId].readings.push(entry);
        });

        // Calculate user activity
        const userActivity = Object.entries(userReadings).map(([userId, data]) => ({
          userId,
          username: data.username,
          email: data.email,
          readingCount: data.readings.length,
          averageSKO: data.readings.reduce((acc, reading) => acc + parseInt(reading.skoValue || 0), 0) / data.readings.length
        })).sort((a, b) => b.readingCount - a.readingCount);

        // Calculate SKO distribution
        const skoDistribution = {
          '0-1': 0,
          '2-3': 0,
          '4': 0,
          '5': 0
        };

        historyData.forEach(entry => {
          const sko = parseInt(entry.skoValue);
          if (sko <= 1) skoDistribution['0-1']++;
          else if (sko <= 3) skoDistribution['2-3']++;
          else if (sko === 4) skoDistribution['4']++;
          else if (sko === 5) skoDistribution['5']++;
        });

        setAnalytics({
          totalUsers,
          totalReadings,
          averageSKO,
          userActivity,
          skoDistribution
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { analytics, loading };
};