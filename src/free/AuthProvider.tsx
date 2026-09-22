import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  createMockAdapter,
  type AuthAdapter,
  type AuthUser,
} from './adapter';

export type AuthContextValue = {
  currentUser: AuthUser | null;
  lastError: string | null;
  adapterName: string;
  login: (email: string, password: string) => Promise<AuthUser>;
  signUp: (email: string, password: string, continueUrl?: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  forgotPassword: (email: string, continueUrl?: string) => Promise<void>;
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  handleVerifyEmail: (actionCode: string) => Promise<void>;
  signInWithGoogle: () => Promise<AuthUser>;
  inviteUser: (email: string, password: string, continueUrl?: string) => Promise<AuthUser>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function messageOf(err: unknown) {
  return err instanceof Error ? err.message : 'Auth failed';
}

export function DfxAuthProvider({
  children,
  adapter,
  adapterName = 'mock',
}: {
  children: ReactNode;
  adapter?: AuthAdapter;
  adapterName?: string;
}) {
  const resolved = useMemo(() => adapter ?? createMockAdapter(), [adapter]);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);

  const value = useMemo<AuthContextValue>(() => {
    const wrap = async <T,>(fn: () => Promise<T>): Promise<T> => {
      try {
        const result = await fn();
        setLastError(null);
        return result;
      } catch (err) {
        setLastError(messageOf(err));
        throw err;
      }
    };

    return {
      currentUser,
      lastError,
      adapterName,
      login: (email, password) =>
        wrap(async () => {
          const user = await resolved.login(email, password);
          setCurrentUser(user);
          return user;
        }),
      signUp: (email, password, continueUrl) =>
        wrap(async () => {
          const user = await resolved.signUp(email, password, continueUrl);
          setCurrentUser(user);
          return user;
        }),
      logout: () =>
        wrap(async () => {
          await resolved.logout();
          setCurrentUser(null);
        }),
      forgotPassword: (email, continueUrl) => wrap(() => resolved.forgotPassword(email, continueUrl)),
      resetPassword: (oobCode, password) => wrap(() => resolved.resetPassword(oobCode, password)),
      changePassword: (password) => wrap(() => resolved.changePassword(password)),
      handleVerifyEmail: (code) => wrap(() => resolved.verifyEmail(code)),
      signInWithGoogle: () =>
        wrap(async () => {
          const user = await resolved.signInWithGoogle();
          setCurrentUser(user);
          return user;
        }),
      inviteUser: (email, password, continueUrl) =>
        wrap(() => resolved.signUp(email, password, continueUrl)),
    };
  }, [adapterName, currentUser, lastError, resolved]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside DfxAuthProvider');
  }
  return ctx;
}

export function AuthStatus() {
  const { currentUser, lastError, adapterName } = useAuth();
  return (
    <div className="space-x-2 p-2 text-sm" data-testid="auth-status">
      <span data-testid="auth-adapter">{adapterName}</span>
      <span data-testid="auth-user">{currentUser ? currentUser.email : 'signed-out'}</span>
      <span data-testid="auth-error">{lastError ?? ''}</span>
    </div>
  );
}
