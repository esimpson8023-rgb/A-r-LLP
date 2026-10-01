import type { Config } from 'tailwindcss';

// Same theme as the single-file site (a-r-llp-v3.html), with the fonts loaded through next/font.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-newsreader)', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#1F1C18',
        paper: '#FAF8F4',
        accent: { DEFAULT: '#86672A', dark: '#6E5421', soft: '#F6EFDF' },
        gold: { DEFAULT: '#B8924A', light: '#E3C88A' },
        navy: { DEFAULT: '#1E3350', mid: '#4A6788', pale: '#EFF4F9', mist: '#CAD9EA' },
      },
    },
  },
  plugins: [],
};

export default config;
