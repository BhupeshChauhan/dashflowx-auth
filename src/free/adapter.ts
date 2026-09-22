export type AuthUser = {
  uid: string;
  email: string;
};

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export type AuthAdapter = {
  login: (email: string, password: string) => Promise<AuthUser>;
  signUp: (email: string, password: string, continueUrl?: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  forgotPassword: (email: string, continueUrl?: string) => Promise<void>;
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  verifyEmail: (actionCode: string) => Promise<void>;
  signInWithGoogle: () => Promise<AuthUser>;
};

export type MockAdapterOptions = {
  users?: { email: string; password: string }[];
};

/** In-memory adapter for Storybook and tests. No network, no Firebase. */
export function createMockAdapter(options: MockAdapterOptions = {}): AuthAdapter {
  const users = new Map(
    (options.users ?? [{ email: 'ada@example.com', password: 'password' }]).map((u) => [
      u.email.toLowerCase(),
      u,
    ])
  );

  function fail(message: string): never {
    throw new AuthError(message);
  }

  return {
    async login(email, password) {
      const row = users.get(email.toLowerCase());
      if (!row || row.password !== password) fail('Invalid email or password');
      return { uid: `mock-${email}`, email: row.email };
    },
    async signUp(email, password) {
      const key = email.toLowerCase();
      if (users.has(key)) fail('Email already registered');
      users.set(key, { email, password });
      return { uid: `mock-${email}`, email };
    },
    async logout() {},
    async forgotPassword(email) {
      if (!users.has(email.toLowerCase())) fail('No account for that email');
    },
    async resetPassword(oobCode, newPassword) {
      if (oobCode === 'bad') fail('Invalid reset code');
      const first = users.values().next().value as { email: string; password: string } | undefined;
      if (first) first.password = newPassword;
    },
    async changePassword(newPassword) {
      if (!newPassword) fail('Password required');
    },
    async verifyEmail(actionCode) {
      if (actionCode === 'bad') fail('Invalid verification code');
    },
    async signInWithGoogle() {
      return { uid: 'mock-google', email: 'ada@example.com' };
    },
  };
}
