/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['"Manrope"', "sans-serif"],
      },
      spacing: {
        82: "20.5rem",
        84: "21rem",
        87: "21.7rem",
      },
      colors: {
        "custom-navy": "#2f53da",
      },
      padding: {
        18: "4.5rem",
        10: "2.5rem",
        14: "3.5rem",
      },
      screens: {
        "2xl": "1526px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
