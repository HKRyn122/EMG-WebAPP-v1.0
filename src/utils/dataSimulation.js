import { ref, set, get } from 'firebase/database';
import { database } from '../firebase';

let running = true;
let intervalId = null;
let currentTimestamp = 1;

const generateVoltage = () => {
  // Generate a random voltage between 1 and 5 mV
  const minVoltage = 1;
  const maxVoltage = 5;
  const voltage = minVoltage + (Math.random() * (maxVoltage - minVoltage));
  return voltage.toFixed(2);
};

const cleanOldData = async () => {
  try {
    const voltageRef = ref(database, 'mv');
    const snapshot = await get(voltageRef);
    const data = snapshot.val() || {};
    
    // Keep only the last 100 entries
    const entries = Object.entries(data)
      .sort((a, b) => {
        const timestampA = parseInt(a[1].split('-')[1]);
        const timestampB = parseInt(b[1].split('-')[1]);
        return timestampB - timestampA;
      })
      .slice(100);
    
    // Remove old entries
    entries.forEach(([key]) => {
      set(ref(database, `mv/${key}`), null);
    });
  } catch (error) {
    console.error('Error cleaning old data:', error);
  }
};

const writeVoltage = () => {
  const voltage = generateVoltage();
  const dataString = `${voltage}-${currentTimestamp}`;
  
  // Generate a unique key using timestamp and random string
  const key = `-OLF${Math.random().toString(36).substr(2, 8)}`;
  set(ref(database, `mv/${key}`), dataString);
  
  // Increment timestamp for next entry
  currentTimestamp++;
};

export const startDataGeneration = () => {
  if (!intervalId) {
    running = true;
    currentTimestamp = 1; // Reset timestamp counter
    cleanOldData();
    writeVoltage();

    intervalId = setInterval(() => {
      if (running) {
        writeVoltage();
      } else {
        clearInterval(intervalId);
        intervalId = null;
      }
    }, 1000); // Update every second
  }
};

export const stopDataGeneration = () => {
  running = false;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};