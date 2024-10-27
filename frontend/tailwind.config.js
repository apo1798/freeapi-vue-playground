const primeui = import('tailwindcss-primeui')

/** @type {import('tailwindcss').Config} */
export default {
  important: '#app',
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.5rem',
        sm: '2rem'
        // lg: '4rem',
        // xl: '5rem',
        // '2xl': '6rem',
      }
    },
    extend: {}
  },
  plugins: [primeui]
}
