const primeui = import('tailwindcss-primeui')

/** @type {import('tailwindcss').Config} */
export default {
  important: '#app',
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [primeui]
}
