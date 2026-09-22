import { describe, expect, it } from 'vitest';
import { AuthError } from '../free/adapter';
import { createAuthAdapter } from './createAuthAdapter';

describe('createAuthAdapter', () => {
  it('defaults to mock', async () => {
    const auth = createAuthAdapter();
    const user = await auth.login('ada@example.com', 'password');
    expect(user.email).toBe('ada@example.com');
  });

  it('does not construct Firebase without an explicit adapter import', () => {
    expect(() => createAuthAdapter({ kind: 'firebase' })).toThrow(AuthError);
  });
});
