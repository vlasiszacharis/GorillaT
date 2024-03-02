/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['"Manrope"', "sans-serif"], // Ensure the font name is correctly quoted
      },
      spacing: {
        82: "20.5rem", // Assuming top-4 is 1rem. Tailwind's default scale already includes this.
        84: "21rem", // Assuming top-8 is 2rem. Tailwind's default scale already includes this.
        87: "21.7rem", // Custom value for top-88 as an example
      },
      colors: {
        "custom-navy": "#2f53da", // Add this line
      },
      padding: {
        18: "4.5rem",
        10: "2.5rem",
        14: "3.5rem",
      },
    },
  },
  plugins: [],
};
