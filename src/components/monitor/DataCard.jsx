import React from 'react';

const DataCard = ({ title, value, unit, className, icon }) => {
  const displayValue = typeof value === 'number' ? value.toFixed(2) : value;
  
  return (
    <div className="card-gradient p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <i className={`fas fa-${icon} text-xl ${className}`}></i>
      </div>
      <div className={`text-3xl font-bold ${className}`}>
        {displayValue} {unit}
      </div>
    </div>
  );
};

export default DataCard;