import './index.css';
export {
  DfxAuthProvider,
  useAuth,
  AuthStatus,
  createMockAdapter,
  AuthError,
  DfxSignIn,
  DfxSignUp,
  DfxForgetPassword,
  DfxResetPassword,
  DfxChangePassword,
  DfxAuthEmail,
} from './free';
export type { AuthAdapter, AuthUser } from './free';
export {
  AUTH_REGISTRY,
  assertUniqueRegistryIds,
  editorPalette,
  isProEntry,
} from './registry';
export type { ComponentRegistry, RegistryEntry, RegistryTier } from './registry';
export { createEcomJwtAdapter } from './adapters/ecomJwt';
export type { EcomJwtAdapterOptions } from './adapters/ecomJwt';
export { createAuthAdapter } from './adapters/createAuthAdapter';
export type { AuthAdapterKind } from './adapters/createAuthAdapter';

/** Dynamic import so tests and mock Storybook do not load Firebase. */
export async function loadFirebaseAdapter(
  ...args: Parameters<typeof import('./adapters/firebase').createFirebaseAdapter>
) {
  const { createFirebaseAdapter } = await import('./adapters/firebase');
  return createFirebaseAdapter(...args);
}
