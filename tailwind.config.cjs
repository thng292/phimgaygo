/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': {
          400: 'rgba(240, 46, 170, 0.4)',
          1000: 'rgba(240, 46, 170, 1)'
        },
        'containerBG': {
          1000: '#f9f9f9'
        }
      }

    },
  },
  plugins: [],

}
