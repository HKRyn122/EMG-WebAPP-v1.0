import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, get, remove, update } from 'firebase/database';
import { ROLES } from '../../utils/roles';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' });
  const [userStats, setUserStats] = useState({
    total: 0,
    admins: 0,
    regularUsers: 0
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = ref(database, 'users');
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
          const usersData = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data
          }));
          setUsers(usersData);
          
          // Calculate user statistics
          const stats = usersData.reduce((acc, user) => ({
            total: acc.total + 1,
            admins: acc.admins + (user.role === ROLES.ADMIN ? 1 : 0),
            regularUsers: acc.regularUsers + (user.role === ROLES.USER ? 1 : 0)
          }), { total: 0, admins: 0, regularUsers: 0 });
          
          setUserStats(stats);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await remove(ref(database, `users/${userId}`));
        setUsers(users.filter(user => user.id !== userId));
        setUserStats(prev => ({
          total: prev.total - 1,
          admins: prev.admins - (users.find(u => u.id === userId)?.role === ROLES.ADMIN ? 1 : 0),
          regularUsers: prev.regularUsers - (users.find(u => u.id === userId)?.role === ROLES.USER ? 1 : 0)
        }));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === ROLES.ADMIN ? ROLES.USER : ROLES.ADMIN;
    try {
      await update(ref(database, `users/${userId}`), { role: newRole });
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      setUserStats(prev => ({
        total: prev.total,
        admins: prev.admins + (newRole === ROLES.ADMIN ? 1 : -1),
        regularUsers: prev.regularUsers + (newRole === ROLES.USER ? 1 : -1)
      }));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.key === 'createdAt') {
      return sortConfig.direction === 'asc' 
        ? a[sortConfig.key] - b[sortConfig.key]
        : b[sortConfig.key] - a[sortConfig.key];
    }
    
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">User Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{userStats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Administrators</h3>
            <p className="text-3xl font-bold text-purple-600">{userStats.admins}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Regular Users</h3>
            <p className="text-3xl font-bold text-green-600">{userStats.regularUsers}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort('username')}
                >
                  <div className="flex items-center">
                    Username
                    {sortConfig.key === 'username' && (
                      <span className="ml-2">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort('email')}
                >
                  <div className="flex items-center">
                    Email
                    {sortConfig.key === 'email' && (
                      <span className="ml-2">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort('role')}
                >
                  <div className="flex items-center">
                    Role
                    {sortConfig.key === 'role' && (
                      <span className="ml-2">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort('createdAt')}
                >
                  <div className="flex items-center">
                    Created At
                    {sortConfig.key === 'createdAt' && (
                      <span className="ml-2">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === ROLES.ADMIN ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button
                      onClick={() => toggleRole(user.id, user.role)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Toggle Role
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;