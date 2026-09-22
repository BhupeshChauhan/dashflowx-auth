import type { Preview } from '@storybook/react';
import { DfxAuthProvider } from '../src/free/AuthProvider';
import '../src/index.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <DfxAuthProvider adapterName="mock">
        <Story />
      </DfxAuthProvider>
    ),
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
  },
};

export default preview;
