import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};