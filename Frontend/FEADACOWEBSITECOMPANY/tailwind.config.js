/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/components/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      screens : {
        'xs' : '450px',
        'sm': '640px',
        'md' :'768px',
        'lg':'1024px',
        'xl':'1280px',
        '2xl':'1500px',
        '3xl':'1920px'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui : {
    theme : false
  },
  darkMode:'class'
}

