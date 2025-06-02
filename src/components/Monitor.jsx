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
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="medical-card mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <i className="fas fa-wave-square text-xl text-primary"></i>
            </div>
            <h2 className="text-2xl font-semibold ml-4 text-gray-900">EMG Monitoring</h2>
          </div>
          
          <AdminNotes />
          
          <div className="vital-stats">
            <DataCard 
              title="Current Reading"
              value={currentValue}
              unit="mV"
              className="text-primary"
              icon="wave-square"
            />
            <DataCard 
              title="Peak Muscle"
              value={peakValue}
              unit="mV"
              className="text-secondary"
              icon="arrow-trend-up"
            />
            <DataCard 
              title="Average Muscle"
              value={averageValue}
              unit="mV"
              className="text-primary"
              icon="chart-line"
            />
            <DataCard 
              title="MSS Grade"
              value={skoValue}
              unit=""
              className="text-secondary"
              icon="dumbbell"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="chart-container">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Real-time EMG Data</h3>
            <EMGChart data={chartData} timestamps={timestamps} />
          </div>
          <div className="medical-card">
            <SKOIndicator currentSKO={skoValue} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;