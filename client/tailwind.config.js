/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"', ...defaultTheme.fontFamily.sans],
        'roboto': ['"Roboto"', ...defaultTheme.fontFamily.sans],
        'code': ['"Fira Code"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'primary': '#1E90FF',
        'secondary': '#FF6347',
        'light': '#C2C2C2',
      }
    },
  },
  plugins: [],
}
