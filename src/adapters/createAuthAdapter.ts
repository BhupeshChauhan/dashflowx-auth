import { AuthError, createMockAdapter, type AuthAdapter, type MockAdapterOptions } from '../free/adapter';
import { createEcomJwtAdapter, type EcomJwtAdapterOptions } from './ecomJwt';

export type AuthAdapterKind = 'mock' | 'ecom-jwt' | 'firebase';

export type CreateAuthAdapterOptions =
  | ({ kind?: 'mock' } & MockAdapterOptions)
  | ({ kind: 'ecom-jwt' } & EcomJwtAdapterOptions)
  | { kind: 'firebase' };

/**
 * Factory for the Storybook/provider `adapter` prop.
 * `firebase` is opt-in: import `createFirebaseAdapter` yourself after EXT-FIREBASE.
 */
export function createAuthAdapter(options: CreateAuthAdapterOptions = {}): AuthAdapter {
  if (options.kind === 'firebase') {
    throw new AuthError(
      'Pass createFirebaseAdapter(config) into DfxAuthProvider after EXT-FIREBASE. Do not load Firebase from the mock/ecom factory.'
    );
  }
  if (options.kind === 'ecom-jwt') {
    return createEcomJwtAdapter(options);
  }
  return createMockAdapter(options);
}
