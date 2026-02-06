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
          DEFAULT: '#18181B',
          dark: '#18181B',
          light: '#3F3F46',
        },
        accent: '#52525B',
        success: '#22C55E',
        danger: '#EF4444',
        warning: '#F59E0B',
        bg: {
          main: '#FAFAFA',
          card: '#FFFFFF',
          sidebar: '#FFFFFF',
        },
        text: {
          primary: '#0A0A0A',
          secondary: '#71717A',
        },
        border: {
          DEFAULT: '#E4E4E7',
          light: '#F4F4F5',
        },
      },
    },
  },
  plugins: [],
}
