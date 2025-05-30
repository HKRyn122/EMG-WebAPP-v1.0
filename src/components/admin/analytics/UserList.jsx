import React, { useState } from 'react';
import { useUsers } from '../../../hooks/useUsers';

function UserList({ onUserSelect }) {
  const { users, loading } = useUsers();
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

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
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <button
              onClick={() => requestSort('username')}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center"
            >
              Sort by Name
              {sortConfig.key === 'username' && (
                <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
            <button
              onClick={() => requestSort('email')}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center"
            >
              Sort by Email
              {sortConfig.key === 'email' && (
                <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {sortedUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => onUserSelect(user.id)}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{user.username}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;