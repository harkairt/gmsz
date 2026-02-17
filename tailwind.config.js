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
          purple: '#7C3AED',
          blue: '#2563EB',
        },
        secondary: {
          pink: '#DB2777',
          orange: '#EA580C',
        },
        background: {
          light: '#FAFBFC',
          muted: '#F1F5F9',
        },
        accent: {
          cyan: '#0891B2',
        },
        text: {
          primary: '#1E293B',
          secondary: '#64748B',
        },
        border: {
          DEFAULT: '#E2E8F0',
          subtle: '#CBD5E1',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #DB2777 0%, #EA580C 100%)',
        'gradient-light': 'linear-gradient(180deg, #FAFBFC 0%, #F1F5F9 100%)',
      },
    },
  },
  plugins: [],
}
