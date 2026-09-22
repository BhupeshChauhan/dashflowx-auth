import { describe, expect, it, vi } from 'vitest';
import { AuthError } from '../free/adapter';
import { assertLocalEcomApi, createEcomJwtAdapter } from './ecomJwt';

describe('createEcomJwtAdapter', () => {
  it('rejects a non-local API base URL', () => {
    expect(() => assertLocalEcomApi('https://api.dashflowx.com')).toThrow(AuthError);
    expect(() => createEcomJwtAdapter({ baseUrl: 'https://ecom.dashflowx.com' })).toThrow(
      /localhost:5000/
    );
  });

  it('logs in against a mocked local /api/v1/auth/login', async () => {
    const fetchImpl = vi.fn(async () =>
      new Response(
        JSON.stringify({
          accessToken: 'tok',
          user: { id: 'u1', email: 'ada@example.com' },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    );
    const auth = createEcomJwtAdapter({
      baseUrl: 'http://127.0.0.1:5000',
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    const user = await auth.login('ada@example.com', 'password');
    expect(user).toEqual({ uid: 'u1', email: 'ada@example.com' });
    expect(fetchImpl).toHaveBeenCalled();
    const [url, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('http://127.0.0.1:5000/api/v1/auth/login');
    expect(init.method).toBe('POST');
  });

  it('maps ecom 401 to AuthError', async () => {
    const fetchImpl = vi.fn(
      async () =>
        new Response(JSON.stringify({ message: 'Invalid password' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
    );
    const auth = createEcomJwtAdapter({
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    await expect(auth.login('ada@example.com', 'nope')).rejects.toBeInstanceOf(AuthError);
  });
});
