import React from 'react';
import { skoGrades } from '../../utils/skoData';

const SKOIndicator = ({ currentSKO }) => {
  const currentGrade = skoGrades.find(grade => grade.grade === currentSKO) || skoGrades[0];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">MSS Status</h2>
      <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{currentSKO}</span>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{currentGrade.title}</h3>
            <p className="text-gray-600">{currentGrade.description}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            {skoGrades.map((grade) => (
              <div
                key={grade.grade}
                className={`text-xs font-semibold ${
                  grade.grade === currentSKO ? 'text-primary' : 'text-gray-400'
                }`}
              >
                {grade.grade}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            {skoGrades.map((grade, index) => (
              <div
                key={grade.grade}
                className={`h-full float-left ${
                  grade.grade === currentSKO
                    ? 'bg-primary'
                    : index <= skoGrades.findIndex(g => g.grade === currentSKO)
                    ? 'bg-primary/30'
                    : 'bg-gray-300'
                }`}
                style={{ width: `${100 / skoGrades.length}%` }}
              />
            ))}
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <i className="fas fa-info-circle text-primary mr-2"></i>
              <span className="text-sm text-gray-600">
                Current Range: <span className="font-semibold">{currentGrade.range}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {skoGrades.map((grade) => (
          <div
            key={grade.grade}
            className={`p-4 rounded-lg transition-all duration-200 ${
              grade.grade === currentSKO
                ? 'bg-primary/10 border-l-4 border-primary'
                : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <span className={`text-lg font-bold ${
                grade.grade === currentSKO ? 'text-primary' : 'text-gray-600'
              }`}>
                Grade {grade.grade}
              </span>
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-white text-gray-600">
                {grade.range}
              </span>
            </div>
            <p className={`text-sm mt-1 ${
              grade.grade === currentSKO ? 'text-gray-800' : 'text-gray-600'
            }`}>
              {grade.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SKOIndicator;