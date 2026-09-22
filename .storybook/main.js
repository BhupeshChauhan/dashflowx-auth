import { mergeConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));

const config = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: { name: '@storybook/react-vite', options: {} },
  docs: { autodocs: 'tag' },
  typescript: { check: false, reactDocgen: 'none' },
  viteFinal: async (config) =>
    mergeConfig(config, {
      resolve: {
        alias: { '@': path.resolve(dir, '../src') },
        dedupe: ['react', 'react-dom'],
      },
    }),
};
export default config;
