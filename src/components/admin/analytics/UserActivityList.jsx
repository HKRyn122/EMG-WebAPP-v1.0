import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserActivityList = ({ userActivity }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">User Activity</h3>
      <div className="space-y-4">
        {userActivity.map((user, index) => (
          <div 
            key={user.userId} 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                {index + 1}
              </span>
              <div className="ml-3">
                <Link 
                  to={`/admin/history?userId=${user.userId}`}
                  className="text-gray-700 font-medium hover:text-blue-600"
                >
                  {user.username}
                </Link>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.readingCount} readings</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivityList;