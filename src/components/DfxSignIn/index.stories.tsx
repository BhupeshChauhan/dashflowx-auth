import type { Meta, StoryObj } from '@storybook/react';
import { DfxSignIn } from '.';

const meta: Meta<typeof DfxSignIn> = {
  title: 'Element/DfxSignIn',
  component: DfxSignIn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    library: 'react',
    type: 'a',
    redirectSignupUrl: 'https://example.com',
    previewImg:
      'https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    previewTitle: 'Preview Title',
    PreviewDescription: 'Preview Description',
    handleSignIn: (data) => {
      console.log(data);
    },
    isLoading: false,
    handleSignOn: () => {},
    handleSignOnError: () => {},
    logoUrl: '/DashflowLogo.png',
    varient: 'basic',
    showSignUp: true,
  },
};
