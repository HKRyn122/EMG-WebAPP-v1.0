import React from 'react';

const DataCard = ({ title, value, unit, className }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className={`text-3xl font-bold ${className}`}>
        {typeof value === 'number' ? value.toFixed(2) : value} {unit}
      </div>
    </div>
  );
};

export default DataCard;