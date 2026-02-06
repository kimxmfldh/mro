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
          DEFAULT: '#E8720C',
          dark: '#1A1A2E',
        },
        accent: '#F59E0B',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        bg: {
          main: '#FFF7ED',
          card: '#FFFFFF',
        },
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
        },
      },
    },
  },
  plugins: [],
}
