/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#29568f',
          'blue-dark': '#1c3d68',
          'blue-soft': '#e8eff7',
          orange: '#ef963e',
          'orange-soft': '#fdf1e2',
          red: '#d33e3e',
          'red-soft': '#fbecec',
        },
        ink: {
          DEFAULT: '#172033',
          muted: '#4c5771',
          light: '#6b7793',
        },
        surface: '#f7f8fa',
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(23, 32, 51, 0.04), 0 8px 24px -12px rgba(23, 32, 51, 0.12)',
        'card-hover': '0 2px 4px rgba(23, 32, 51, 0.05), 0 16px 36px -16px rgba(23, 32, 51, 0.22)',
        soft: '0 1px 0 rgba(23, 32, 51, 0.04)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        content: '76rem',
      },
      keyframes: {
        reveal: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        reveal: 'reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
