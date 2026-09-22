import { AuthError, type AuthAdapter, type AuthUser } from '../free/adapter';

export type EcomJwtAdapterOptions = {
  /** Local ecom API only. Default http://127.0.0.1:5000 — never production RDS. */
  baseUrl?: string;
  fetchImpl?: typeof fetch;
};

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

export function assertLocalEcomApi(baseUrl: string): URL {
  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    throw new AuthError('Invalid ecom API base URL');
  }
  if (!LOCAL_HOSTS.has(url.hostname)) {
    throw new AuthError(
      'ecom JWT adapter only talks to the local API on localhost:5000. Production RDS/API is not allowed.'
    );
  }
  return url;
}

async function parseError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { error?: string; message?: string };
    return body.error || body.message || `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}

function userFromJson(body: {
  user?: { id?: string; email?: string };
  accessToken?: string;
}): AuthUser {
  const id = body.user?.id;
  const email = body.user?.email;
  if (!id || !email) throw new AuthError('ecom login response missing user');
  return { uid: id, email };
}

/**
 * JWT adapter for local ecom Express (`POST /api/v1/auth/login` on :5000).
 * Do not point this at production.
 */
export function createEcomJwtAdapter(options: EcomJwtAdapterOptions = {}): AuthAdapter {
  const base = assertLocalEcomApi(options.baseUrl ?? 'http://127.0.0.1:5000').origin;
  const fetchImpl = options.fetchImpl ?? fetch.bind(globalThis);

  async function json(path: string, init: RequestInit) {
    const res = await fetchImpl(`${base}${path}`, {
      ...init,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    });
    if (!res.ok) throw new AuthError(await parseError(res));
    if (res.status === 204) return {};
    return res.json();
  }

  const unsupported = (action: string): never => {
    throw new AuthError(
      `${action} is not on this adapter. Use ecom’s own password/email routes on local /api/v1/auth — not production.`
    );
  };

  async function login(email: string, password: string) {
    const body = await json('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return userFromJson(body);
  }

  return {
    login,
    async signUp(email, password) {
      const body = await json('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name: email.split('@')[0] }),
      });
      if (body.user?.id && body.user?.email) {
        return { uid: body.user.id, email: body.user.email };
      }
      return login(email, password);
    },
    async logout() {
      await json('/api/v1/auth/logout', { method: 'POST' });
    },
    async forgotPassword() {
      unsupported('Forgot password');
    },
    async resetPassword() {
      unsupported('Reset password');
    },
    async changePassword() {
      unsupported('Change password');
    },
    async verifyEmail() {
      unsupported('Verify email');
    },
    signInWithGoogle() {
      return unsupported('Google sign-in');
    },
  };
}
