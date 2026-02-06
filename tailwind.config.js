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
          DEFAULT: '#F06A6A',
          dark: '#E85858',
          light: '#FF9494',
        },
        accent: {
          DEFAULT: '#FFB648',
          light: '#FFD280',
        },
        success: '#14B8A6',
        danger: '#F06A6A',
        warning: '#FFB648',
        bg: {
          main: '#F9FAFB',
          card: '#FFFFFF',
          sidebar: '#FCFCFC',
          header: '#FFFFFF',
        },
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          tertiary: '#9CA3AF',
        },
        border: {
          DEFAULT: '#E5E7EB',
          light: '#F3F4F6',
        },
      },
    },
  },
  plugins: [],
}
