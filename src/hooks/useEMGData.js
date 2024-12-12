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

  useEffect(() => {
    startDataGeneration();

    const dataRef = ref(database, 'Muscle Voltage');
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
        if (user) {
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