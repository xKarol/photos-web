import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Quicksand } from "@next/font/google";

const openSans = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${openSans.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
