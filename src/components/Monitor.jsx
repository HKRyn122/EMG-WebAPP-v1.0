import React from 'react';
import { useEMGData } from '../hooks/useEMGData';
import EMGChart from './charts/EMGChart';
import DataCard from './monitor/DataCard';
import SKOIndicator from './monitor/SKOIndicator';
import AdminNotes from './monitor/AdminNotes';
import HistoryTable from './monitor/HistoryTable';
import { useAuth } from '../hooks/useAuth';
import { calculateSKO } from '../utils/skoCalculator';

function Monitor() {
  const {
    currentValue,
    peakValue,
    averageValue,
    skoValue,
    chartData,
    timestamps,
    sessionHistory
  } = useEMGData();

  const { user } = useAuth();

  // Calculate session-based MSS values from current session data
  const calculateSessionMSS = () => {
    if (chartData.length === 0) {
      return {
        mssPeak: '0',
        mssAverage: '0'
      };
    }

    // Calculate MSS for each data point in current session
    const mssValues = chartData.map(value => parseInt(calculateSKO(value)));
    const mssPeak = Math.max(...mssValues).toString();
    const mssAverage = (mssValues.reduce((acc, val) => acc + val, 0) / mssValues.length).toFixed(1);

    return {
      mssPeak,
      mssAverage
    };
  };

  const { mssPeak, mssAverage } = calculateSessionMSS();

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
              title="MSS Peak"
              value={mssPeak}
              unit=""
              className="text-secondary"
              icon="dumbbell"
            />
            <DataCard 
              title="MSS Average"
              value={mssAverage}
              unit=""
              className="text-primary"
              icon="calculator"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="chart-container">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Real-time EMG Data</h3>
            <EMGChart data={chartData} timestamps={timestamps} />
          </div>
          <div className="medical-card">
            <SKOIndicator currentSKO={skoValue} />
          </div>
        </div>

        {/* Session History Table */}
        <HistoryTable history={sessionHistory} loading={false} isSessionData={true} />
      </div>
    </div>
  );
}

export default Monitor;