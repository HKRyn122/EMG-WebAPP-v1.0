import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, query, orderByChild, equalTo, limitToLast, onValue } from 'firebase/database';

export const useMonitoringHistory = (userId, limit = 50) => {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    peakVoltage: 0,
    averageVoltage: 0,
    peakMuscleScale: '0',
    averageMuscleScale: '0',
    totalReadings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const historyRef = query(
      ref(database, 'history'),
      orderByChild('userId'),
      equalTo(userId),
      limitToLast(limit)
    );

    const unsubscribe = onValue(historyRef, (snapshot) => {
      if (snapshot.exists()) {
        const historyData = Object.entries(snapshot.val())
          .map(([id, data]) => ({ id, ...data }))
          .sort((a, b) => b.timestamp - a.timestamp);

        setHistory(historyData);

        // Calculate statistics
        if (historyData.length > 0) {
          const voltages = historyData.map(entry => parseFloat(entry.currentValue) || 0);
          const scales = historyData.map(entry => parseInt(entry.skoValue) || 0);

          const peakVoltage = Math.max(...voltages);
          const averageVoltage = voltages.reduce((acc, val) => acc + val, 0) / voltages.length;
          const peakMuscleScale = Math.max(...scales).toString();
          const averageMuscleScale = (scales.reduce((acc, val) => acc + val, 0) / scales.length).toFixed(1);

          setStats({
            peakVoltage: Number(peakVoltage.toFixed(2)),
            averageVoltage: Number(averageVoltage.toFixed(2)),
            peakMuscleScale,
            averageMuscleScale,
            totalReadings: historyData.length
          });
        }
      } else {
        setHistory([]);
        setStats({
          peakVoltage: 0,
          averageVoltage: 0,
          peakMuscleScale: '0',
          averageMuscleScale: '0',
          totalReadings: 0
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, limit]);

  return { history, stats, loading };
};