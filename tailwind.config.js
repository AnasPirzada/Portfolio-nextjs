const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      yellow: '#c8860a',
      /** Theme-aware gold (Warm Editorial in light, GoldenGlow in dark) */
      accent: {
        light: 'var(--accent-light)',
        dark: 'var(--accent-dark)',
      },
      red: '#cf0000',
      green: '#00ac56',
      GoldenGlow: {
        light: '#efc041',
        dark: '#eeba2c',
      },
      gray: {
        light: {
          1: '#efe9e0',
          2: '#ddd5c8',
          3: '#b0b0b0',
          4: '#7a7a7a',
        },
        dark: {
          1: '#323133',
          2: '#242225',
          3: '#1e1b20',
          4: '#1a171e',
          5: '#120e16',
        },
      },
      light: {
        bg: '#f7f4ef',
        surface: '#fdfbf7',
        text: {
          primary: '#1a1410',
          secondary: '#3d3530',
        },
        border: '#ddd5c8',
      },
      dark: {
        bg: '#000000',
        surface: '#1a1a1a',
        text: {
          primary: '#ffffff',
          secondary: '#aaaaaa',
        },
        border: '#1f1f1f',
      },
    },
    fontFamily: {
      sans: ['var(--font-calibre)'],
      mono: ['var(--font-jetbrains-mono)'],
      arabic: ["'Noto Sans Arabic'", 'Segoe UI', 'Tahoma', 'sans-serif'],
    },
    extend: {
      animation: {
        meteor: 'meteor 5s linear infinite',
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
          '70%': { opacity: 1 },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addVariant }) {
      addVariant('rtl', '[dir="rtl"] &');
      addVariant('ltr', '[dir="ltr"] &');

      addUtilities({
        '.start-0': { 'inset-inline-start': '0' },
        '.start-auto': { 'inset-inline-start': 'auto' },
        '.end-0': { 'inset-inline-end': '0' },
        '.end-auto': { 'inset-inline-end': 'auto' },
        '.ms-auto': { 'margin-inline-start': 'auto' },
        '.me-auto': { 'margin-inline-end': 'auto' },
        '.ps-0': { 'padding-inline-start': '0' },
        '.pe-0': { 'padding-inline-end': '0' },
        '.text-start': { 'text-align': 'start' },
        '.text-end': { 'text-align': 'end' },
        '.border-s': { 'border-inline-start-width': '1px' },
        '.border-e': { 'border-inline-end-width': '1px' },
        '.rounded-s': {
          'border-start-start-radius': '0.25rem',
          'border-end-start-radius': '0.25rem',
        },
        '.rounded-e': {
          'border-start-end-radius': '0.25rem',
          'border-end-end-radius': '0.25rem',
        },
        '.flip-x': { transform: 'scaleX(-1)' },
      });
    }),
  ],
};
