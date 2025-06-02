import React from 'react';

const DataCard = ({ title, value, unit, className, icon }) => {
  const displayValue = typeof value === 'number' ? value.toFixed(2) : value;
  
  return (
    <div className="vital-card slide-up">
      <div className="vital-icon">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`text-2xl font-bold ${className}`}>
          {displayValue} {unit}
        </div>
      </div>
    </div>
  );
};

export default DataCard;