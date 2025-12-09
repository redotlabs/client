import { colors, typography } from '@redotlabs/tokens';
import type { Config } from 'tailwindcss';
import path from 'path';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@repo/ui',
    './node_modules/@repo/builder/renderer',
    './node_modules/@repo/builder/editor',
    path.join(path.dirname(require.resolve('@redotlabs/ui')), '**/*.js'),
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: {
          DEFAULT: 'var(--color-primary-500)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
      },
      fontSize: typography.size,
      fontWeight: typography.weight,
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
