import React from 'react';

const RecentActivities = ({ activities }) => {
  return (
    <div className="bg-white shadow-md p-4 mb-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
      <ul className="list-disc list-inside">
        {activities.map((activity, index) => (
          <li key={index} className="mb-2">
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
