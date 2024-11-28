import React from 'react';
import { skoGrades } from '../../utils/skoData';

const SKOIndicator = ({ currentSKO }) => {
  const currentGrade = skoGrades.find(grade => grade.grade === currentSKO) || skoGrades[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Current SKO Status</h2>
      <div className="flex items-center mb-4">
        <div className="text-4xl font-bold text-orange-600 mr-4">
          Grade {currentSKO}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800">{currentGrade.title}</h3>
          <p className="text-gray-600">{currentGrade.description}</p>
        </div>
      </div>
      <div className="relative pt-4">
        <div className="flex mb-2 justify-between">
          {skoGrades.map((grade) => (
            <div
              key={grade.grade}
              className={`text-xs font-semibold ${
                grade.grade === currentSKO ? 'text-orange-600' : 'text-gray-500'
              }`}
            >
              {grade.grade}
            </div>
          ))}
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          {skoGrades.map((grade, index) => (
            <div
              key={grade.grade}
              className={`h-full ${
                grade.grade === currentSKO
                  ? 'bg-orange-600'
                  : index <= skoGrades.findIndex(g => g.grade === currentSKO)
                  ? 'bg-orange-200'
                  : 'bg-gray-300'
              }`}
              style={{ width: `${100 / skoGrades.length}%` }}
            />
          ))}
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Range: {currentGrade.range}
        </div>
      </div>
    </div>
  );
};

export default SKOIndicator;