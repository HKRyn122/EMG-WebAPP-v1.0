import { ref, push, serverTimestamp } from 'firebase/database';
import { database } from '../firebase';

export const saveEMGHistory = async (userId, emgData) => {
  if (!userId) {
    console.warn('Cannot save EMG history: No user ID provided');
    return;
  }

  try {
    // Validate data before saving
    const validatedData = {
      userId,
      currentValue: Number(emgData.currentValue) || 0,
      peakValue: Number(emgData.peakValue) || 0,
      averageValue: Number(emgData.averageValue) || 0,
      skoValue: emgData.skoValue || '0',
      timestamp: serverTimestamp()
    };

    const historyRef = ref(database, 'history');
    await push(historyRef, validatedData);
  } catch (error) {
    console.error('Error saving EMG history:', error.message);
    // Store failed saves in localStorage for retry
    const failedSaves = JSON.parse(localStorage.getItem('failedEmgSaves') || '[]');
    failedSaves.push({
      userId,
      ...emgData,
      timestamp: Date.now()
    });
    localStorage.setItem('failedEmgSaves', JSON.stringify(failedSaves));
  }
};