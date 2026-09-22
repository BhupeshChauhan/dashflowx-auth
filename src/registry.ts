/**
 * Auth registry (AU05). Shape matches docs/projects/registry.ts (F04).
 * Ids must stay unique vs CORE_REGISTRY (`core.*`), forms.*, and datagrid.*.
 */

export type RegistryTier = 'free' | 'pro';

export type RegistryEntry = {
  id: string;
  title: string;
  tier: RegistryTier;
  editor: boolean;
};

export type ComponentRegistry = readonly RegistryEntry[];

export const AUTH_REGISTRY = [
  { id: 'auth.signin', title: 'Sign in', tier: 'free', editor: true },
  { id: 'auth.signup', title: 'Sign up', tier: 'free', editor: true },
  { id: 'auth.forget-password', title: 'Forget password', tier: 'free', editor: true },
  { id: 'auth.reset-password', title: 'Reset password', tier: 'free', editor: true },
  { id: 'auth.change-password', title: 'Change password', tier: 'free', editor: true },
  { id: 'auth.verify-email', title: 'Verify email', tier: 'free', editor: true },
  { id: 'auth.provider', title: 'Auth provider', tier: 'free', editor: false },
  { id: 'auth.adapter-mock', title: 'Mock adapter', tier: 'free', editor: false },
  { id: 'auth.adapter-ecom-jwt', title: 'Ecom JWT adapter', tier: 'free', editor: false },
  { id: 'auth.adapter-firebase', title: 'Firebase adapter (opt-in)', tier: 'free', editor: false },
  { id: 'auth.sso-saml', title: 'SSO / SAML', tier: 'pro', editor: true },
  { id: 'auth.magic-link', title: 'Magic link', tier: 'pro', editor: true },
  { id: 'auth.org-invites', title: 'Org invites', tier: 'pro', editor: true },
] as const satisfies ComponentRegistry;

export function isProEntry(entry: RegistryEntry): boolean {
  return entry.tier === 'pro';
}

export function editorPalette(registry: ComponentRegistry = AUTH_REGISTRY): RegistryEntry[] {
  return registry.filter((entry) => entry.editor);
}

export function assertUniqueRegistryIds(registry: ComponentRegistry = AUTH_REGISTRY): void {
  const seen = new Set<string>();
  for (const entry of registry) {
    if (seen.has(entry.id)) {
      throw new Error(`Duplicate registry id: ${entry.id}`);
    }
    seen.add(entry.id);
  }
}

export default AUTH_REGISTRY;
