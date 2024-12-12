import { useState, useEffect } from 'react';
import { auth, database } from '../firebase';
import { ref, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user role from database
        const userRef = ref(database, `users/${firebaseUser.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: userData?.role || 'user'
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};