import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DfxSsoSaml } from './SsoSaml';
import { DfxMagicLink } from './MagicLink';
import { DfxOrgInvites } from './OrgInvites';

describe('Auth/Pro stubs', () => {
  it('completes a mock SAML assertion', async () => {
    const user = userEvent.setup();
    render(<DfxSsoSaml />);
    await user.selectOptions(screen.getByTestId('sso-protocol'), 'SAML');
    await user.click(screen.getByTestId('sso-continue'));
    expect(screen.getByTestId('sso-session')).toHaveTextContent('Mock assertion');
  });

  it('opens a mock magic link', async () => {
    const user = userEvent.setup();
    render(<DfxMagicLink />);
    await user.click(screen.getByTestId('magic-send'));
    expect(screen.getByTestId('magic-session')).toHaveTextContent('link-sent');
    await user.click(screen.getByTestId('magic-open'));
    expect(screen.getByTestId('magic-session')).toHaveTextContent('ada@example.com');
  });

  it('adds a pending org invite', async () => {
    const user = userEvent.setup();
    render(<DfxOrgInvites />);
    await user.type(screen.getByTestId('invite-email'), 'teo@example.com');
    await user.click(screen.getByTestId('invite-send'));
    expect(screen.getByTestId('invite-list')).toHaveTextContent('teo@example.com (pending)');
  });
});
