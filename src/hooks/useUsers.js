import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
};