import React from 'react';
import DataCard from './DataCard';

const HistoryStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
        ))}
      </div>
    );
  }

  return null; // Component is no longer used but keeping for compatibility
};

export default HistoryStats;