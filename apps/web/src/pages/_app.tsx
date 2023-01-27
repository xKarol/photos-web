import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClientProvider, QueryClient } from "react-query";
import localFont from "@next/font/local";

const defaultFont = localFont({
  variable: "--font-montserrat",
  src: [
    {
      path: "../../../public/montserrat/ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../../../public/montserrat/Light.ttf",
      weight: "300",
    },
    {
      path: "../../../public/montserrat/Regular.ttf",
      weight: "400",
    },
    {
      path: "../../../public/montserrat/Medium.ttf",
      weight: "500",
    },
  ],
});

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("react-query/devtools/development").then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

declare global {
  interface Window {
    toggleQueryDevtools: (toggle: boolean) => void;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      window.toggleQueryDevtools = (toggle: boolean) => setShowDevtools(toggle);
      window.toggleQueryDevtools(true);
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          font-family: ${defaultFont.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          {showDevtools && (
            <React.Suspense fallback={null}>
              <ReactQueryDevtoolsProduction />
            </React.Suspense>
          )}
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
