/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        chase: {
          navy: '#0B2A5B',
          blue: '#0060F0',
          bright: '#117ACA',
          sky: '#E6F1FD',
          bg: '#F3F5F8',
          ink: '#1B2633',
          muted: '#5B6675',
          line: '#E3E7ED',
        },
        jpm: {
          cream: '#F8F6F1',
          brown: '#3B2A1A',
          sand: '#D9B999',
          green: '#8FB37F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Libre Baskerville"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-120%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2)',
        slideUp: 'slideUp 0.3s ease-out',
        fadeIn: 'fadeIn 0.25s ease-out',
        pop: 'pop 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.3)',
      },
    },
  },
  plugins: [],
};
