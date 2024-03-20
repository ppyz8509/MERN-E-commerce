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
        primaryBG:"#FCFCFC",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui:{
    themes:["light"]
  }
}


