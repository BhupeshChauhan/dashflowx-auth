import type { Meta, StoryObj } from '@storybook/react';
import { DfxAuthProvider } from '../free/AuthProvider';
import { createMockAdapter } from '../free/adapter';
import { DfxSsoSaml } from './SsoSaml';
import { DfxMagicLink } from './MagicLink';
import { DfxOrgInvites } from './OrgInvites';

const meta: Meta = {
  title: 'Auth/Pro',
  decorators: [
    (Story) => (
      <DfxAuthProvider adapter={createMockAdapter()} adapterName="mock">
        <Story />
      </DfxAuthProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj;

export const SsoSaml: Story = {
  render: () => <DfxSsoSaml />,
};

export const MagicLink: Story = {
  render: () => <DfxMagicLink />,
};

export const OrgInvites: Story = {
  render: () => <DfxOrgInvites />,
};
