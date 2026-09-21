const config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@dashflowx/core/**/*.{js,ts,jsx,tsx}',
    './node_modules/@dashflowx/ui/**/*.{js,ts,jsx,tsx}',
    './node_modules/@dashflowx/datagrid/**/*.{js,ts,jsx,tsx}',
    './node_modules/@dashflowx/auth/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      background: 'hsl(var(--color-background))',
      colors: {
        primary: {
          DEFAULT: '#2561a2',
          light: '#2561a2',
          dark: '#a3d1ff',
        },
        secondary: {
          light: '#ffa37e',
          dark: '#ffd3c2',
        },
        accent: {
          light: '#b23840',
          dark: '#fd5863',
        },
        bgcolor: {
          light: '#f8f9f5',
          dark: '#1b1d1c',
        },
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        wiggle: 'pulse 500ms ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
