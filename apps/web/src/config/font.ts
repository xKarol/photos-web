import localFont from "next/font/local";

const defaultFont = localFont({
  variable: "--font-montserrat",
  src: [
    {
      path: "../../public/assets/fonts/montserrat/Montserrat-ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../../public/assets/fonts/montserrat/Montserrat-Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/assets/fonts/montserrat/Montserrat-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/assets/fonts/montserrat/Montserrat-Medium.ttf",
      weight: "500",
    },
  ],
});

export default defaultFont;
