import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { fontFamily } from "tailwindcss/defaultTheme";
import { breakpoints } from "./src/styles/breakpoints";

export default {
  content: ["**/*.{jsx,tsx}"],
  theme: {
    extend: {
      screens: breakpoints,
      fontFamily: {
        sans: ["var(--font-montserrat)", ...fontFamily.sans],
      },
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
  },
  plugins: [],
} satisfies Config;
