/**
 * Pro magic-link stub. Delivers a fake link in-memory — no email provider (AU04).
 */
import { useState } from 'react';

export function DfxMagicLink() {
  const [email, setEmail] = useState('ada@example.com');
  const [sent, setSent] = useState(false);
  const [session, setSession] = useState<string | null>(null);

  return (
    <div className="max-w-md space-y-4 p-6 text-sm" data-testid="pro-magic">
      <h2 className="text-xl font-semibold">Magic link</h2>
      <p className="text-slate-600">Mock inbox. No SES/Twilio and no production Firebase.</p>
      <label className="block">
        Email
        <input
          className="mt-1 w-full rounded border px-2 py-1"
          data-testid="magic-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button
        type="button"
        className="rounded bg-slate-900 px-3 py-2 text-white"
        data-testid="magic-send"
        onClick={() => setSent(true)}
      >
        Send mock magic link
      </button>
      {sent ? (
        <button
          type="button"
          className="rounded border px-3 py-2"
          data-testid="magic-open"
          onClick={() => setSession(email)}
        >
          Open mock magic link
        </button>
      ) : null}
      <p data-testid="magic-session">{session ? session : sent ? 'link-sent' : 'signed-out'}</p>
    </div>
  );
}
