import React from 'react';
import { useUsers } from '../../../hooks/useUsers';

function UserList({ onUserSelect }) {
  const { users, loading } = useUsers();

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">User Analytics</h1>
      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onUserSelect(user.id)}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{user.username}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;