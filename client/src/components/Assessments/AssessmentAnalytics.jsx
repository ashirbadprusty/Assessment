import React from 'react';

const AssessmentAnalytics = ({ analytics }) => {
  return (
    <div className="bg-white shadow-md p-4 mb-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Assessment Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {analytics.map((stat, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="text-2xl">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentAnalytics;
