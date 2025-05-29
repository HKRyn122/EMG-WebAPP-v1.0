import { ref, set, get } from 'firebase/database';
import { database } from '../firebase';

let running = true;
let intervalId = null;

const generateVoltage = () => {
  const minVoltage = 0.5;
  const maxVoltage = 5.5;
  const voltage = minVoltage + (Math.random() * (maxVoltage - minVoltage));
  return voltage.toFixed(2);
};

const cleanOldData = async () => {
  try {
    const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000);
    const voltageRef = ref(database, 'Muscle Voltage');
    const snapshot = await get(voltageRef);
    const data = snapshot.val() || {};
    
    // Remove entries older than 30 minutes
    Object.entries(data).forEach(([key, value]) => {
      const timestamp = parseInt(value.split('-')[1]);
      if (timestamp < thirtyMinutesAgo) {
        set(ref(database, `Muscle Voltage/${key}`), null);
      }
    });
  } catch (error) {
    console.error('Error cleaning old data:', error);
  }
};

const writeVoltage = () => {
  const timestamp = Date.now();
  const voltage = generateVoltage();
  const dataString = `${voltage}-${timestamp}`;
  
  set(ref(database, `Muscle Voltage/${timestamp}`), dataString);
};

export const startDataGeneration = () => {
  if (!intervalId) {
    running = false; // Allow data generation
    cleanOldData(); // Clean old data on start
    writeVoltage(); // Write initial value immediately

    intervalId = setInterval(() => {
      if (running) {
        writeVoltage();
      } else {
        clearInterval(intervalId); // Stop interval if running is false
        intervalId = null; // Reset the interval ID
      }
    }, 2000); // Update every 2 seconds
  }
};

export const stopDataGeneration = () => {
  running = true; // Stop data generation
  if (intervalId) {
    clearInterval(intervalId); // Clear the interval
    intervalId = null; // Reset the interval ID
  }
};

