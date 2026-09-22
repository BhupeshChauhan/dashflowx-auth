/**
 * Pro SSO/SAML stub. No live IdP — Storybook uses this mock only (AU04).
 */
import { useState } from 'react';

const PROVIDERS = ['Okta', 'Azure AD', 'Google Workspace'] as const;
const PROTOCOLS = ['SAML', 'OIDC'] as const;

export type DfxSsoSamlProps = {
  defaultEmail?: string;
};

export function DfxSsoSaml({ defaultEmail = 'ada@example.com' }: DfxSsoSamlProps) {
  const [provider, setProvider] = useState<(typeof PROVIDERS)[number]>('Okta');
  const [protocol, setProtocol] = useState<(typeof PROTOCOLS)[number]>('SAML');
  const [session, setSession] = useState<string | null>(null);

  return (
    <div className="max-w-md space-y-4 p-6 text-sm" data-testid="pro-sso">
      <h2 className="text-xl font-semibold">SSO / SAML</h2>
      <p className="text-slate-600">Mock IdP only. Do not point this at a production tenant.</p>
      <label className="block">
        Provider
        <select
          className="mt-1 w-full rounded border px-2 py-1"
          data-testid="sso-provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value as (typeof PROVIDERS)[number])}
        >
          {PROVIDERS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <label className="block">
        Protocol
        <select
          className="mt-1 w-full rounded border px-2 py-1"
          data-testid="sso-protocol"
          value={protocol}
          onChange={(e) => setProtocol(e.target.value as (typeof PROTOCOLS)[number])}
        >
          {PROTOCOLS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="rounded bg-slate-900 px-3 py-2 text-white"
        data-testid="sso-continue"
        onClick={() => setSession(`${protocol}:${provider}:${defaultEmail}`)}
      >
        Continue with mock {protocol}
      </button>
      {session ? (
        <p data-testid="sso-session" className="rounded bg-slate-100 p-2">
          Mock assertion for {session}
        </p>
      ) : (
        <p data-testid="sso-session">signed-out</p>
      )}
    </div>
  );
}
