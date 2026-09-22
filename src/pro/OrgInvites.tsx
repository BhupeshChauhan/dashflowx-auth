/**
 * Pro org-invite stub. In-memory roster — no live directory (AU04).
 */
import { useState } from 'react';

type Invite = { email: string; status: 'pending' | 'accepted' };

export function DfxOrgInvites() {
  const [email, setEmail] = useState('');
  const [invites, setInvites] = useState<Invite[]>([
    { email: 'ada@example.com', status: 'accepted' },
  ]);
  const [copied, setCopied] = useState('');

  function invite() {
    const key = email.trim().toLowerCase();
    if (!key || invites.some((i) => i.email === key)) return;
    setInvites((rows) => [...rows, { email: key, status: 'pending' }]);
    setEmail('');
  }

  return (
    <div className="max-w-lg space-y-4 p-6 text-sm" data-testid="pro-invites">
      <h2 className="text-xl font-semibold">Org invites</h2>
      <p className="text-slate-600">Mock roster. No SCIM and no production IdP.</p>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-2 py-1"
          data-testid="invite-email"
          type="email"
          placeholder="teammate@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="button"
          className="rounded bg-slate-900 px-3 py-2 text-white"
          data-testid="invite-send"
          onClick={invite}
        >
          Invite
        </button>
      </div>
      <ul data-testid="invite-list" className="divide-y rounded border">
        {invites.map((row) => (
          <li key={row.email} className="flex items-center justify-between px-3 py-2">
            <span>
              {row.email} ({row.status})
            </span>
            {row.status === 'pending' ? (
              <button
                type="button"
                className="text-blue-700 underline"
                data-testid={`invite-copy-${row.email}`}
                onClick={() => setCopied(`https://localhost:6009/invite/${row.email}`)}
              >
                Copy mock link
              </button>
            ) : null}
          </li>
        ))}
      </ul>
      <p data-testid="invite-copied">{copied || 'none'}</p>
    </div>
  );
}
