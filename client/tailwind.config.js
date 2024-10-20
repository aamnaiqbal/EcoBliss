/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "black": "#000000",
        "grey": "#767676",
        "white": "#FFFFFF",
        "green": "#1B4332",
        "bgSky": "#52B7884D",
        "lightGreen": "#52B788",

      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

