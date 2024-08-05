/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { UseFirebase } from '@/Hooks/firebase';
import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
} from 'firebase/auth';

interface AuthContextType {
  currentUser: string | null;
  signInWithGoogle: () => any;
  login: (email: any, password: any) => any;
  signUp: (email: any, password: any, continueUrl: any) => any;
  logout: () => any;
  resetPassword: (oobCode: any, newPassword: any) => any;
  forgotPassword: (email: string, continueUrl: any) => any;
  inviteUser: (email: any, password: any, continueUrl: any) => any;
  changePassword: (newPassword: any) => any;
  handleVerifyEmail: (actionCode: any) => any;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  signUp: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
  inviteUser: () => Promise,
  changePassword: () => Promise,
  handleVerifyEmail: () => Promise,
});

const useAuth = () => useContext(AuthContext);

const DfxAuthProvider = ({ children, firebaseConfig }: any) => {
  const { auth } = UseFirebase(firebaseConfig || null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    console.log('The user is', currentUser);
  }, [currentUser]);

  function login(email: any, password: any) {
    if (!auth) return;
    return signInWithEmailAndPassword(auth, email, password);
  }

  function inviteUser(email: any, password: any, continueUrl: any) {
    if (!auth) return;
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // send verification mail.
        sendEmailVerification(userCredential.user, {
          url: continueUrl,
        });
        auth.signOut();
        console.log('email send', email);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  }

  function handleVerifyEmail(actionCode: any) {
    if (!auth) return;
    return applyActionCode(auth, actionCode);
  }

  function signUp(email: any, password: any, continueUrl: any) {
    if (!auth) return;
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // send verification mail.
        sendEmailVerification(userCredential.user, {
          url: continueUrl,
        });
        auth.signOut();
        console.log('email send', email);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  }

  function forgotPassword(email: any, continueUrl: any) {
    if (!auth) return;
    return sendPasswordResetEmail(auth, email, {
      url: continueUrl,
    });
  }

  function resetPassword(oobCode: any, newPassword: any) {
    if (!auth) return;
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  function changePassword(newPassword: any) {
    if (!auth?.currentUser) return;
    return updatePassword(auth.currentUser, newPassword);
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
    inviteUser,
    handleVerifyEmail,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { DfxAuthProvider, useAuth };
