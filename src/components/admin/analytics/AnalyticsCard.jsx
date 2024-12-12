import React from 'react';

const AnalyticsCard = ({ title, value, icon, className }) => {
  return (
    <div className="card-gradient p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <i className={`fas fa-${icon} text-xl ${className}`}></i>
      </div>
      <p className={`text-3xl font-bold ${className}`}>{value}</p>
    </div>
  );
};

export default AnalyticsCard;