import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AuthStatus, DfxAuthProvider } from './AuthProvider';
import { createMockAdapter } from './adapter';
import { DfxSignIn } from '../components/DfxSignIn';
import { DfxSignUp } from '../components/DfxSignUp';
import { DfxForgetPassword } from '../components/DfxForgetPassword';
import { DfxResetPassword } from '../components/DfxResetPassword';
import { DfxChangePassword } from '../components/DfxChangePassword';
import { DfxAuthEmail } from '../components/DfxAuthEmail';

const adapter = createMockAdapter();

function Shell({ children }: { children: ReactNode }) {
  return (
    <DfxAuthProvider adapter={adapter} adapterName="mock">
      <AuthStatus />
      {children}
    </DfxAuthProvider>
  );
}

const meta: Meta = {
  title: 'Auth/Free',
  decorators: [(Story) => <Shell><Story /></Shell>],
};
export default meta;

type Story = StoryObj;

const preview = {
  previewImg:
    'https://images.unsplash.com/photo-1565301660306-29e08751cc53?auto=format&fit=crop&w=687&q=80',
  previewTitle: 'Mock adapter',
  PreviewDescription: 'No live Firebase. ada@example.com / password succeeds.',
};

export const SignIn: Story = {
  render: () => (
    <DfxSignIn
      library="react"
      type="a"
      forgetPasswordUrl="#forget"
      redirectSignupUrl="#signup"
      logoUrl="/DashflowLogo.png"
      varient="basic"
      handleSignIn={() => undefined}
      {...preview}
    />
  ),
};

export const SignUp: Story = {
  render: () => (
    <DfxSignUp
      library="react"
      type="a"
      redirectSignInUrl="#signin"
      logoUrl="/DashflowLogo.png"
      varient="basic"
      continueUrl="#verify"
      handleSignUp={() => undefined}
      {...preview}
    />
  ),
};

export const ForgetPassword: Story = {
  render: () => (
    <DfxForgetPassword
      library="react"
      type="a"
      redirectSignInUrl="#signin"
      varient="basic"
      continueUrl="#reset"
      {...preview}
    />
  ),
};

export const ResetPassword: Story = {
  render: () => (
    <DfxResetPassword
      library="react"
      type="a"
      redirectSignInUrl="#signin"
      varient="basic"
      oobCode="ok"
      handleResetPassword={() => undefined}
      {...preview}
    />
  ),
};

export const ChangePassword: Story = {
  render: () => (
    <DfxChangePassword
      library="react"
      type="a"
      redirectSignInUrl="#signin"
      varient="basic"
      handleChangePassword={() => undefined}
    />
  ),
};

export const VerifyEmail: Story = {
  render: () => (
    <DfxAuthEmail
      mode="verifyEmail"
      library="react"
      type="a"
      redirectSignInUrl="#signin"
      varient="basic"
      oobCode="ok"
      handleResetPassword={() => undefined}
      handleEmailVerified={() => undefined}
      {...preview}
    />
  ),
};
