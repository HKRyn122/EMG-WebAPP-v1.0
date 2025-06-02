import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, get, remove, update } from 'firebase/database';
import { ROLES } from '../../utils/roles';
import { Link } from 'react-router-dom';

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="medical-card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Link to="/admin" className="text-primary hover:text-primary-dark mr-4">
                <i className="fas fa-arrow-left"></i>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-sm text-gray-600">Manage system users and permissions</p>
              </div>
            </div>
            <img src="/V3 1200-01.png" alt="Logo" className="h-10" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="stats-card">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <i className="fas fa-users text-xl text-primary"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-primary">{userStats.total}</p>
                </div>
              </div>
            </div>
            
            <div className="stats-card">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <i className="fas fa-user-shield text-xl text-secondary"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Administrators</p>
                  <p className="text-2xl font-bold text-secondary">{userStats.admins}</p>
                </div>
              </div>
            </div>
            
            <div className="stats-card">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <i className="fas fa-user text-xl text-primary"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Regular Users</p>
                  <p className="text-2xl font-bold text-primary">{userStats.regularUsers}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            <table className="data-table">
              <thead>
                <tr>
                  <th onClick={() => requestSort('username')} className="cursor-pointer">
                    <div className="flex items-center">
                      Username
                      {sortConfig.key === 'username' && (
                        <i className={`fas fa-sort-${sortConfig.direction === 'asc' ? 'up' : 'down'} ml-2`}></i>
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('email')} className="cursor-pointer">
                    <div className="flex items-center">
                      Email
                      {sortConfig.key === 'email' && (
                        <i className={`fas fa-sort-${sortConfig.direction === 'asc' ? 'up' : 'down'} ml-2`}></i>
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('role')} className="cursor-pointer">
                    <div className="flex items-center">
                      Role
                      {sortConfig.key === 'role' && (
                        <i className={`fas fa-sort-${sortConfig.direction === 'asc' ? 'up' : 'down'} ml-2`}></i>
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('createdAt')} className="cursor-pointer">
                    <div className="flex items-center">
                      Created At
                      {sortConfig.key === 'createdAt' && (
                        <i className={`fas fa-sort-${sortConfig.direction === 'asc' ? 'up' : 'down'} ml-2`}></i>
                      )}
                    </div>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="font-medium text-gray-900">{user.username}</td>
                    <td className="text-gray-600">{user.email}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === ROLES.ADMIN 
                          ? 'bg-secondary/10 text-secondary' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => toggleRole(user.id, user.role)}
                          className="text-secondary hover:text-secondary-dark transition-colors duration-200"
                        >
                          <i className="fas fa-exchange-alt"></i>
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;