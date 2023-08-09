/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#8AC6D0',
        primary: '#C65B7C',
        teritiary: '#5B3758'
      }
    }
  },
  plugins: []
})
