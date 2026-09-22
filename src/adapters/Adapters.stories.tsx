import type { Meta, StoryObj } from '@storybook/react';
import { AuthStatus, DfxAuthProvider } from '../free/AuthProvider';
import { createMockAdapter } from '../free/adapter';
import { createEcomJwtAdapter } from './ecomJwt';
import { DfxSignIn } from '../components/DfxSignIn';

const preview = {
  previewImg:
    'https://images.unsplash.com/photo-1565301660306-29e08751cc53?auto=format&fit=crop&w=687&q=80',
  previewTitle: 'Adapter',
  PreviewDescription: 'Switch DfxAuthProvider adapter. Storybook default is mock.',
};

const meta: Meta = {
  title: 'Auth/Adapters',
};
export default meta;

type Story = StoryObj;

export const MockDefault: Story = {
  render: () => (
    <DfxAuthProvider adapter={createMockAdapter()} adapterName="mock">
      <AuthStatus />
      <p className="p-4 text-sm">Firebase env is not required. ada@example.com / password.</p>
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
    </DfxAuthProvider>
  ),
};

export const EcomJwtLocal: Story = {
  render: () => (
    <DfxAuthProvider
      adapter={createEcomJwtAdapter({ baseUrl: 'http://127.0.0.1:5000' })}
      adapterName="ecom-jwt"
    >
      <AuthStatus />
      <p className="p-4 text-sm">
        Talks to local ecom <code>POST /api/v1/auth/login</code> on :5000 only. Start backend with{' '}
        <code>./scripts/dev-up.sh</code>. Never production RDS.
      </p>
      <DfxSignIn
        library="react"
        type="a"
        forgetPasswordUrl="#forget"
        redirectSignupUrl="#signup"
        logoUrl="/DashflowLogo.png"
        varient="basic"
        handleSignIn={() => undefined}
        showSignOn={false}
        {...preview}
        PreviewDescription="Local ecom JWT. Production API is rejected."
      />
    </DfxAuthProvider>
  ),
};

export const FirebaseOptIn: Story = {
  render: () => (
    <div className="p-6 text-sm space-y-2">
      <p>
        Live Firebase is gated on <strong>EXT-FIREBASE</strong>. This story does not initialize a
        Firebase app.
      </p>
      <p>
        After a yes, paste test keys into local <code>dashflowx-auth/.env</code> (never git) and pass{' '}
        <code>createFirebaseAdapter(&#123; config &#125;)</code> into <code>DfxAuthProvider</code>.
      </p>
      <p>Do not use a production Firebase project.</p>
    </div>
  ),
};
