import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

export const useUserNotes = (userId) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const notesRef = ref(database, `users/${userId}/notes`);
    const unsubscribe = onValue(notesRef, (snapshot) => {
      if (snapshot.exists()) {
        const notesData = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data
        })).sort((a, b) => b.timestamp - a.timestamp);
        setNotes(notesData);
      } else {
        setNotes([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { notes, loading };
};