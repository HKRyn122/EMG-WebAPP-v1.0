import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, setPersistence, browserLocalPersistence, fetchSignInMethodsForEmail } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBb5HvDBTwJPzq7NS-ZgcsuxGhScFxz3tY",
  authDomain: "emg-proto-web.firebaseapp.com",
  databaseURL: "https://emg-proto-web-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "emg-proto-web",
  storageBucket: "emg-proto-web.firebasestorage.app",
  messagingSenderId: "234583830528",
  appId: "1:234583830528:web:5285f6d848864aa4ab68e5",
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