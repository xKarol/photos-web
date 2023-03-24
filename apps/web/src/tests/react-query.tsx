/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClientConfig } from "../config/query-client";

const queryClient = new QueryClient({
  ...queryClientConfig,
  defaultOptions: {
    ...queryClientConfig.defaultOptions,
    queries: {
      ...queryClientConfig.defaultOptions.queries,
      retry: false,
    },
  },
  logger: {
    error: () => {},
    warn: console.warn,
    log: console.log,
  },
});

function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;
