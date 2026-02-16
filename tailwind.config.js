/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#8B5CF6',
          blue: '#3B82F6',
        },
        secondary: {
          pink: '#EC4899',
          orange: '#F97316',
        },
        background: {
          dark: '#0F172A',
          darker: '#020617',
        },
        accent: {
          cyan: '#06B6D4',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #EC4899 0%, #F97316 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0F172A 0%, #020617 100%)',
      },
    },
  },
  plugins: [],
}
