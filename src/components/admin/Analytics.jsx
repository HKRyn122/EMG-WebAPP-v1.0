import React, { useState } from 'react';
import UserList from './analytics/UserList';
import UserAnalytics from './analytics/UserAnalytics';

function Analytics() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  const handleBack = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 py-8">
      <div className="container mx-auto px-4">
        {selectedUserId ? (
          <>
            <button
              onClick={handleBack}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to User List
            </button>
            <UserAnalytics userId={selectedUserId} />
          </>
        ) : (
          <UserList onUserSelect={handleUserSelect} />
        )}
      </div>
    </div>
  );
}

export default Analytics;