import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { processEMGData } from '../utils/emgDataProcessor';
import { calculateSKO } from '../utils/skoCalculator';
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

  // Reset all values when component mounts or user changes
  useEffect(() => {
    setCurrentValue(0);
    setPeakValue(0);
    setAverageValue(0);
    setSkoValue('0');
    setChartData([]);
    setTimestamps([]);
  }, [user?.uid]);

  useEffect(() => {
    const dataRef = ref(database, 'mv');
    let isFirstUpdate = true;

    const unsubscribe = onValue(dataRef, async (snapshot) => {
      // Skip the first update to avoid loading old data
      if (isFirstUpdate) {
        isFirstUpdate = false;
        return;
      }

      const processedData = processEMGData(snapshot.val());
      
      if (processedData) {
        const { currentValue, peakValue, averageValue, chartData, timestamps } = processedData;
        
        setCurrentValue(currentValue);
        setPeakValue(peakValue);
        setAverageValue(averageValue);
        setSkoValue(calculateSKO(currentValue));
        setChartData(chartData);
        setTimestamps(timestamps);

        // Save history if user is logged in and values are valid
        if (user?.uid && currentValue > 0) {
          try {
            await saveEMGHistory(user.uid, {
              currentValue,
              peakValue,
              averageValue,
              skoValue: calculateSKO(currentValue),
              timestamp: Date.now()
            });
          } catch (error) {
            console.error('Error saving EMG history:', error);
          }
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user?.uid]);

  return {
    currentValue,
    peakValue,
    averageValue,
    skoValue,
    chartData,
    timestamps
  };
};