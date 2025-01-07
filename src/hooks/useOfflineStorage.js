import { useState, useEffect } from 'react';

export const useOfflineStorage = (key) => {
  const [data, setData] = useState(null);

  // Load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, [key]);

  // Save data to localStorage
  const saveData = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  return [data, saveData];
};