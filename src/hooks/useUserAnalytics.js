import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';

export const useUserAnalytics = (userId) => {
  const [analytics, setAnalytics] = useState({
    totalReadings: 0,
    averageSKO: 0,
    latestSKO: null,
    skoDistribution: {
      '0-1': 0,
      '2-3': 0,
      '4': 0,
      '5': 0
    },
    recentHistory: []
  });
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAnalytics = async () => {
      try {
        // Fetch user data
        const userRef = ref(database, `users/${userId}`);
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          setUserData(userSnapshot.val());
        }

        // Fetch user's history
        const historyRef = ref(database, 'history');
        const historySnapshot = await get(historyRef);
        if (historySnapshot.exists()) {
          const userHistory = Object.entries(historySnapshot.val())
            .map(([id, data]) => ({ id, ...data }))
            .filter(entry => entry.userId === userId)
            .sort((a, b) => b.timestamp - a.timestamp);

          // Calculate analytics
          const totalReadings = userHistory.length;
          const skoValues = userHistory.map(entry => parseInt(entry.skoValue));
          const averageSKO = skoValues.reduce((acc, val) => acc + val, 0) / totalReadings;
          const latestSKO = userHistory[0]?.skoValue || null;

          // Calculate SKO distribution
          const skoDistribution = {
            '0-1': 0,
            '2-3': 0,
            '4': 0,
            '5': 0
          };

          userHistory.forEach(entry => {
            const sko = parseInt(entry.skoValue);
            if (sko <= 1) skoDistribution['0-1']++;
            else if (sko <= 3) skoDistribution['2-3']++;
            else if (sko === 4) skoDistribution['4']++;
            else if (sko === 5) skoDistribution['5']++;
          });

          setAnalytics({
            totalReadings,
            averageSKO,
            latestSKO,
            skoDistribution,
            recentHistory: userHistory.slice(0, 10) // Get last 10 readings
          });
        }
      } catch (error) {
        console.error('Error fetching user analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserAnalytics();
    }
  }, [userId]);

  return { analytics, userData, loading };
};