/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["**/*.{jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", ...fontFamily.sans],
      },
    },
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      red: colors.red,
      primary: "#EDE3DA",
      secondary: "#E2CEBC",
      font: "#3C3A36",
    },
    extend: {
      container: {
        padding: {
          DEFAULT: "16px",
          sm: "32px",
          md: "32px",
          lg: "64px",
          xl: "80px",
          "2xl": "96px",
        },
      },
    },
  },
  plugins: [],
};
