import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { calculateSKO } from '../utils/skoCalculator';
import EMGChart from './charts/EMGChart';
import DataCard from './monitor/DataCard';
import SKOIndicator from './monitor/SKOIndicator';

function Monitor() {
  const [currentValue, setCurrentValue] = useState(0);
  const [peakValue, setPeakValue] = useState(0);
  const [averageValue, setAverageValue] = useState(0);
  const [skoValue, setSkoValue] = useState('0');
  const [chartData, setChartData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const dataRef = ref(database, 'Muscle Voltage');
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const sensor_count = Object.values(data);
      const listSensor = [];
      const listTime = [];

      for (let i = 0; i < sensor_count.length; i++) {
        const [value, time] = sensor_count[i].split("-");
        listSensor.push(parseFloat(value));
        listTime.push(parseFloat(time));
      }

      const max_count = Math.max(...listTime);
      const position = listTime.indexOf(max_count);
      const last_sensor = listSensor[position];

      setCurrentValue(last_sensor);
      setPeakValue(Math.max(...listSensor));
      setAverageValue(listSensor.reduce((a, b) => a + b, 0) / listSensor.length);
      setSkoValue(calculateSKO(last_sensor));
      
      setChartData(prev => [...prev, last_sensor].slice(-30));
      setTimestamps(prev => [...prev, Date.now()].slice(-30));
    });
  }, []);

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <DataCard 
          title="Current Reading"
          value={currentValue}
          unit="mV"
          className="text-blue-600"
        />
        <DataCard 
          title="Peak Muscle"
          value={peakValue}
          unit="mV"
          className="text-green-600"
        />
        <DataCard 
          title="Average Muscle"
          value={averageValue}
          unit="mV"
          className="text-purple-600"
        />
        <DataCard 
          title="SKO (Muscle Strength)"
          value={skoValue}
          unit=""
          className="text-orange-600"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <EMGChart data={chartData} timestamps={timestamps} />
        </div>
        <SKOIndicator currentSKO={skoValue} />
      </div>
    </div>
  );
}

export default Monitor;