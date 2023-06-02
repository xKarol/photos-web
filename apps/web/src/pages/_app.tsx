import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import React, { useState } from "react";

import defaultFont from "../config/font";
import SEO from "../config/next-seo";
import { queryClientConfig } from "../config/query-client";
import useReactQueryDevtools from "../hooks/use-react-query-devtools";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));
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
