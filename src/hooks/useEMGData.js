import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { processEMGData } from '../utils/emgDataProcessor';
import { calculateSKO } from '../utils/skoCalculator';
import { startDataGeneration, stopDataGeneration } from '../utils/dataSimulation';
import { saveEMGHistory } from '../utils/history';
import { useAuth } from './useAuth';

export const useEMGData = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [peakValue, setPeakValue] = useState(0);
  const [averageValue, setAverageValue] = useState(0);
  const [skoValue, setSkoValue] = useState('0');
  const [chartData, setChartData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const { user } = useAuth();

  // Retry failed saves
  useEffect(() => {
    const retryFailedSaves = async () => {
      if (!user?.uid) return;

      const failedSaves = JSON.parse(localStorage.getItem('failedEmgSaves') || '[]');
      if (failedSaves.length === 0) return;

      const newFailedSaves = [];
      for (const save of failedSaves) {
        try {
          await saveEMGHistory(user.uid, save);
        } catch (error) {
          newFailedSaves.push(save);
        }
      }

      localStorage.setItem('failedEmgSaves', JSON.stringify(newFailedSaves));
    };

    retryFailedSaves();
  }, [user]);

  useEffect(() => {
    startDataGeneration();

    const dataRef = ref(database, 'mv');
    const unsubscribe = onValue(dataRef, async (snapshot) => {
      const processedData = processEMGData(snapshot.val());
      
      if (processedData) {
        const { currentValue, peakValue, averageValue, chartData, timestamps } = processedData;
        
        setCurrentValue(currentValue || 0);
        setPeakValue(peakValue || 0);
        setAverageValue(averageValue || 0);
        setSkoValue(calculateSKO(currentValue || 0));
        setChartData(chartData || []);
        setTimestamps(timestamps || []);

        // Save history if user is logged in
        if (user?.uid) {
          await saveEMGHistory(user.uid, {
            currentValue,
            peakValue,
            averageValue,
            skoValue: calculateSKO(currentValue || 0),
            timestamp: Date.now()
          });
        }
      }
    });

    return () => {
      unsubscribe();
      stopDataGeneration();
    };
  }, [user]);

  return {
    currentValue,
    peakValue,
    averageValue,
    skoValue,
    chartData,
    timestamps
  };
};