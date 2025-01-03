import React from 'react';

function DataHistoryList({ history }) {
  return (
    <div className="space-y-4">
      {history.map((entry) => (
        <div key={entry.id} className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">SKO Grade</p>
              <p className="text-lg font-semibold text-purple-600">{entry.skoValue}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Peak Value</p>
              <p className="text-lg font-semibold text-blue-600">{entry.peakValue.toFixed(2)} mV</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(entry.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DataHistoryList;