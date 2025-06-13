import React from 'react';

const HistoryTable = ({ history, loading, isSessionData = false }) => {
  if (loading) {
    return (
      <div className="medical-card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-12 bg-gray-100 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="medical-card text-center py-12">
        <i className="fas fa-chart-line text-4xl text-gray-300 mb-4"></i>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          {isSessionData ? 'No Session Data' : 'No History Available'}
        </h3>
        <p className="text-gray-500">
          {isSessionData 
            ? 'Start monitoring to see real-time session data' 
            : 'Start monitoring to see your EMG data history'
          }
        </p>
      </div>
    );
  }

  const tableTitle = isSessionData ? 'Current Session History' : 'Recent History';
  const displayCount = isSessionData ? Math.min(history.length, 20) : 20;

  return (
    <div className="medical-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <i className={`fas ${isSessionData ? 'fa-clock' : 'fa-table'} text-xl text-primary`}></i>
          </div>
          <h2 className="text-2xl font-semibold ml-4 text-gray-900">{tableTitle}</h2>
        </div>
        {isSessionData && history.length > 0 && (
          <div className="flex items-center text-sm text-gray-500">
            <i className="fas fa-circle text-green-500 mr-2 animate-pulse"></i>
            Live Session Data
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Voltage (mV)</th>
              <th>Peak (mV)</th>
              <th>Average (mV)</th>
              <th>MSS Grade</th>
            </tr>
          </thead>
          <tbody>
            {history.slice(0, displayCount).map((entry, index) => (
              <tr key={entry.id || index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="font-medium">
                  {isSessionData 
                    ? new Date(entry.timestamp).toLocaleTimeString()
                    : new Date(entry.timestamp).toLocaleTimeString()
                  }
                </td>
                <td>
                  <span className="px-2 py-1 bg-[#00A79D]/10 text-[#00A79D] rounded-full text-sm font-medium">
                    {Number(entry.currentValue).toFixed(2)}
                  </span>
                </td>
                <td>
                  <span className="px-2 py-1 bg-[#2B3990]/10 text-[#2B3990] rounded-full text-sm font-medium">
                    {Number(entry.peakValue).toFixed(2)}
                  </span>
                </td>
                <td>
                  <span className="px-2 py-1 bg-[#00A79D]/10 text-[#00A79D] rounded-full text-sm font-medium">
                    {Number(entry.averageValue).toFixed(2)}
                  </span>
                </td>
                <td>
                  <span className="px-2 py-1 bg-[#2B3990]/10 text-[#2B3990] rounded-full text-sm font-medium">
                    Grade {entry.skoValue}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {history.length > displayCount && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Showing latest {displayCount} entries of {history.length} total {isSessionData ? 'session' : ''} readings
          </p>
        </div>
      )}
      
      {isSessionData && history.length > 0 && (
        <div className="mt-4 p-4 bg-gradient-to-r from-[#00A79D]/5 to-[#2B3990]/5 rounded-lg">
          <div className="flex items-center text-sm text-gray-600">
            <i className="fas fa-info-circle text-[#00A79D] mr-2"></i>
            <span>
              This table shows real-time data from your current monitoring session. 
              Data refreshes automatically and resets when you start a new session.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryTable;