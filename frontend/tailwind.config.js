/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["**/*.{jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: "#EDE3DA",
      secondary: "#E2CEBC",
      font: "#3C3A36",
    },
    extend: {
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
};
