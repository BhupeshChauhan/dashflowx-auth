import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  applyActionCode,
  confirmPasswordReset,
  type Auth,
} from 'firebase/auth';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { AuthError, type AuthAdapter, type AuthUser } from '../free/adapter';
import type { ifirebaseConfig } from '../Hooks/firebase';

export type FirebaseAdapterOptions = {
  config?: ifirebaseConfig | null;
  auth?: Auth;
};

function toUser(uid: string | undefined, email: string | null | undefined): AuthUser {
  if (!uid || !email) throw new AuthError('Firebase user missing email');
  return { uid, email };
}

/**
 * Opt-in Firebase adapter. Do not call until EXT-FIREBASE is approved.
 * Paste keys only into local dashflowx-auth `.env`. Never production.
 */
export function createFirebaseAdapter(options: FirebaseAdapterOptions = {}): AuthAdapter {
  let auth = options.auth;
  if (!auth) {
    if (!options.config?.apiKey) {
      throw new AuthError(
        'Firebase adapter needs a local test config after EXT-FIREBASE yes. Storybook default is the mock adapter.'
      );
    }
    const app: FirebaseApp = initializeApp(options.config);
    auth = getAuth(app);
  }
  if (!auth) {
    throw new AuthError('Firebase Auth instance is missing');
  }
  const firebaseAuth = auth;

  return {
    async login(email, password) {
      const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return toUser(cred.user.uid, cred.user.email);
    },
    async signUp(email, password) {
      const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return toUser(cred.user.uid, cred.user.email);
    },
    async logout() {
      await signOut(firebaseAuth);
    },
    async forgotPassword(email, continueUrl) {
      await sendPasswordResetEmail(
        firebaseAuth,
        email,
        continueUrl ? { url: continueUrl } : undefined
      );
    },
    async resetPassword(oobCode, newPassword) {
      await confirmPasswordReset(firebaseAuth, oobCode, newPassword);
    },
    async changePassword(newPassword) {
      const user = firebaseAuth.currentUser;
      if (!user?.email) throw new AuthError('Not signed in');
      await updatePassword(user, newPassword);
    },
    async verifyEmail(actionCode) {
      await applyActionCode(firebaseAuth, actionCode);
    },
    async signInWithGoogle() {
      const cred = await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
      return toUser(cred.user.uid, cred.user.email);
    },
  };
}
