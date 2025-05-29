import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, setPersistence, browserLocalPersistence, fetchSignInMethodsForEmail } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCNsXBCVAmJVPTBTa_DeI6m1Au_nF8L7W0",
  authDomain: "emg-proto-test.firebaseapp.com",
  databaseURL: "https://emg-proto-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "emg-proto-test",
  storageBucket: "emg-proto-test.firebasestorage.app",
  messagingSenderId: "81645338518",
  appId: "1:81645338518:web:d5ddf66d19ec53783127b7",
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