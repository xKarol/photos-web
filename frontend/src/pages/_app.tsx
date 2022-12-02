import { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Quicksand } from "@next/font/google";
import { Hydrate, QueryClientProvider, QueryClient } from "react-query";

const openSans = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${openSans.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
