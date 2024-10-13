/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4B5563', // gray-600
          dark: '#E5E7EB', // gray-200
        },
        background: {
          light: '#FFFFFF', // white
          dark: '#1F2937', // gray-800
        },
      },
    },
  },
  plugins: [],
};
