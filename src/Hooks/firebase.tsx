import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

interface ifirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
export const UseFirebase = (firebaseConfig: ifirebaseConfig | null) => {
  // Initialize Firebase
  if (!firebaseConfig) return { app: null, auth: null, provider: null };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  return { app, auth, provider };
};
