import { describe, expect, it } from 'vitest';
import { AuthError, createMockAdapter } from './adapter';

describe('createMockAdapter', () => {
  it('signs in ada@example.com / password', async () => {
    const auth = createMockAdapter();
    const user = await auth.login('ada@example.com', 'password');
    expect(user.email).toBe('ada@example.com');
  });

  it('rejects a wrong password', async () => {
    const auth = createMockAdapter();
    await expect(auth.login('ada@example.com', 'nope')).rejects.toBeInstanceOf(AuthError);
  });
});
