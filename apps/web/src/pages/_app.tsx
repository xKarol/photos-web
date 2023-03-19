import React, { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";
import SEO from "../config/next-seo";
import defaultFont from "../config/font";
import useReactQueryDevtools from "../hooks/use-react-query-devtools";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const ReactQueryDevtools = useReactQueryDevtools();

  return (
    <>
      <DefaultSeo {...SEO} />
      <style jsx global>{`
        :root {
          font-family: ${defaultFont.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
