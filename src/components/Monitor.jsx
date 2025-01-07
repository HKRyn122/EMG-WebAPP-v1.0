import React from 'react';
import { useEMGData } from '../hooks/useEMGData';
import { useUserNotes } from '../hooks/useUserNotes';
import EMGChart from './charts/EMGChart';
import DataCard from './monitor/DataCard';
import SKOIndicator from './monitor/SKOIndicator';
import AdminNotes from './monitor/AdminNotes';
import { useAuth } from '../hooks/useAuth';

function Monitor() {
  const {
    currentValue,
    peakValue,
    averageValue,
    skoValue,
    chartData,
    timestamps
  } = useEMGData();

  const { user } = useAuth();
  const { notes, loading } = useUserNotes(user?.uid);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-sky-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">EMG Monitoring Dashboard</h1>
        
        <AdminNotes />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <DataCard 
            title="Current Reading"
            value={currentValue}
            unit="mV"
            className="text-blue-600"
            icon="wave-square"
          />
          <DataCard 
            title="Peak Muscle"
            value={peakValue}
            unit="mV"
            className="text-green-600"
            icon="arrow-trend-up"
          />
          <DataCard 
            title="Average Muscle"
            value={averageValue}
            unit="mV"
            className="text-purple-600"
            icon="chart-line"
          />
          <DataCard 
            title="SKO (Muscle Strength)"
            value={skoValue}
            unit=""
            className="text-orange-600"
            icon="dumbbell"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-gradient p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-time EMG Data</h2>
            <EMGChart data={chartData} timestamps={timestamps} />
          </div>
          <div className="card-gradient p-6 rounded-xl shadow-lg">
            <SKOIndicator currentSKO={skoValue} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;