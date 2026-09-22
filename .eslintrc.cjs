module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['dist', 'storybook-static', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-hooks'],
  rules: {
    'react-refresh/only-export-components': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
