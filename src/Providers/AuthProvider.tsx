/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { UseFirebase } from '@/Hooks/firebase';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

interface AuthContextType {
  currentUser: string | null;
  signInWithGoogle: () => any;
  login: (email: any, password: any) => any;
  signUp: (email: any, password: any) => any;
  logout: () => any;
  resetPassword: (oobCode: any, newPassword: any) => any;
  forgotPassword: (email: string) => any;
  // Add other functions and properties here
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  signUp: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
});

const useAuth = () => useContext(AuthContext);

const DfxAuthProvider = ({ children, firebaseConfig, logInUrl }: any) => {
  const { auth } = UseFirebase(firebaseConfig || null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    console.log('The user is', currentUser);
  }, [currentUser]);

  function login(email: any, password: any) {
    if (!auth) return;
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email: any, password: any) {
    if (!auth) return;
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function forgotPassword(email: any) {
    if (!auth) return;
    return sendPasswordResetEmail(auth, email, {
      url: logInUrl,
    });
  }

  function resetPassword(oobCode: any, newPassword: any) {
    if (!auth) return;
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  function logout() {
    if (!auth) return;
    return signOut(auth);
  }

  function signInWithGoogle() {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  useEffect(() => {
    if (!auth) setCurrentUser(null);
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user ? user : null);
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
    login,
    signUp,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { DfxAuthProvider, useAuth };
