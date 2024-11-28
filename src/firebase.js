import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, setPersistence, browserLocalPersistence, fetchSignInMethodsForEmail } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAz_6FyYi5s8yi9obcAmPlgoSI8zY-HYGs",
  authDomain: "emg-capstone-01.firebaseapp.com",
  databaseURL: "https://emg-capstone-01-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "emg-capstone-01",
  storageBucket: "emg-capstone-01.firebasestorage.app",
  messagingSenderId: "1014928201043",
  appId: "1:1014928201043:web:ca1ea5edbecd31f4de7da6"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);

// Enable persistent auth state
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });

// Helper function to check if email/password auth is enabled
export const checkAuthMethods = async () => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, 'test@example.com');
    return methods.includes('password');
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      // If we get an invalid email error, it means the auth endpoint is working
      return true;
    }
    console.error('Error checking auth methods:', error);
    return false;
  }
};