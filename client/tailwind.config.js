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
        secondary:"#555",
        primaryBG: "#7E7E7E"
      }
    },
  },
  plugins: [require("daisyui")],

}