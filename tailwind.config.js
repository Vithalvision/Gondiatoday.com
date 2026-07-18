/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#D32F2F',
          dark: '#B71C1C',
          light: '#EF5350',
        },
        ink: '#1A1A1A',
        body: '#4A4A4A',
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F7F5F3',
        },
        border: '#E8E5E1',
        live: '#C62828',
      },
      fontFamily: {
        display: ['var(--font-poppins)', 'Noto Sans Devanagari', 'sans-serif'],
        body: ['var(--font-inter)', 'Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.10)',
      },
      borderRadius: {
        card: '0.5rem',
      },
      maxWidth: {
        wrap: '1280px',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        ticker: 'ticker 30s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
