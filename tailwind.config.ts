import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0c0c0c',
        'black-2': '#151515',
        grey: '#d8d8d4',
        'grey-2': '#c8c8c3',
        mut: '#7b7b76',
        'mut-l': '#6e6e68',
        orange: '#ff4d00',
        line: 'rgba(216, 216, 212, 0.15)',
        'line-d': 'rgba(12, 12, 12, 0.22)',
      },
      fontFamily: {
        sans: ['Switzer', 'Aeonik', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      spacing: {
        pad: 'clamp(20px, 4vw, 72px)',
      },
      transitionTimingFunction: {
        folio: 'cubic-bezier(0.83, 0, 0.17, 1)',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0.15' },
        },
        noise: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-4%, 3%)' },
          '50%': { transform: 'translate(3%, -4%)' },
          '75%': { transform: 'translate(-3%, -3%)' },
        },
        mq: {
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'blink': 'blink 1.6s steps(2) infinite',
        'noise': 'noise 6s steps(8) infinite',
        'mq': 'mq 22s linear infinite',
        'mq-rev': 'mq 26s linear infinite reverse',
        'spin-slow': 'spin 14s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;