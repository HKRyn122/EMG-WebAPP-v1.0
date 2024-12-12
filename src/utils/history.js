import { ref, push, serverTimestamp } from 'firebase/database';
import { database } from '../firebase';

export const saveEMGHistory = async (userId, emgData) => {
  try {
    const historyRef = ref(database, 'history');
    await push(historyRef, {
      userId,
      ...emgData,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error saving EMG history:', error);
  }
};