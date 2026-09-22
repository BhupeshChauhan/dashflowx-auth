import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthStatus, DfxAuthProvider } from './AuthProvider';
import { DfxSignIn } from '../components/DfxSignIn';
import { DfxSignUp } from '../components/DfxSignUp';
import { createMockAdapter } from './adapter';

const preview = {
  previewImg: '',
  previewTitle: 't',
  PreviewDescription: 'd',
};

function wrap(ui: ReactNode) {
  return render(
    <DfxAuthProvider adapter={createMockAdapter()} adapterName="mock">
      <AuthStatus />
      {ui}
    </DfxAuthProvider>
  );
}

describe('Auth/Free screens (mock adapter)', () => {
  it('signs in with mock success', async () => {
    const user = userEvent.setup();
    wrap(
      <DfxSignIn
        library="react"
        type="a"
        forgetPasswordUrl="#f"
        redirectSignupUrl="#s"
        logoUrl=""
        varient="basic"
        handleSignIn={() => undefined}
        {...preview}
      />
    );
    await user.type(screen.getByPlaceholderText('Email'), 'ada@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(await screen.findByTestId('auth-user')).toHaveTextContent('ada@example.com');
    expect(screen.getByTestId('auth-error')).toHaveTextContent('');
  });

  it('shows mock error on bad password', async () => {
    const user = userEvent.setup();
    wrap(
      <DfxSignIn
        library="react"
        type="a"
        forgetPasswordUrl="#f"
        redirectSignupUrl="#s"
        logoUrl=""
        varient="basic"
        handleSignIn={() => undefined}
        {...preview}
      />
    );
    await user.type(screen.getByPlaceholderText('Email'), 'ada@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'wrong');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(await screen.findByTestId('auth-error')).toHaveTextContent('Invalid email or password');
    expect(screen.getByTestId('auth-user')).toHaveTextContent('signed-out');
  });

  it('signs up a new mock user', async () => {
    const user = userEvent.setup();
    wrap(
      <DfxSignUp
        library="react"
        type="a"
        redirectSignInUrl="#i"
        logoUrl=""
        varient="basic"
        continueUrl="#v"
        handleSignUp={() => undefined}
        {...preview}
      />
    );
    await user.type(screen.getByPlaceholderText('First and Last Name'), 'Ada Lovelace');
    await user.type(screen.getByPlaceholderText('Email'), 'new@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password');
    await user.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(await screen.findByTestId('auth-user')).toHaveTextContent('new@example.com');
  });
});
