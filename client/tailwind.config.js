/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        red:"#830109",
        secondary:"#555555",
        primaryBG: "#77e7e7e"
      }
    },
  },
  plugins: [require("daisyui")],

}