import { colors, typography } from '@redotlabs/tokens';
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@repo/ui'],
  theme: {
    extend: {
      colors: {
        ...colors,
        white: '#ffffff',
        primary: {
          DEFAULT: 'var(--color-primary-600)',
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
