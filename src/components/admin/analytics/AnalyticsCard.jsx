import React from 'react';

const AnalyticsCard = ({ title, value, icon, className, unit = '' }) => {
  const displayValue = typeof value === 'number' ? value.toFixed(2) : value;
  
  return (
    <div className="card-gradient p-6 rounded-xl shadow-lg">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          className.includes('text-primary') || className.includes('text-[#00A79D]') 
            ? 'bg-[#00A79D]/10' 
            : 'bg-[#2B3990]/10'
        }`}>
          <i className={`fas fa-${icon} text-xl ${className}`}></i>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <div className={`text-2xl font-bold ${className}`}>
            {displayValue} {unit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;