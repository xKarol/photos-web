/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-empty-function */
import type { QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: Number.POSITIVE_INFINITY,
      refetchOnWindowFocus: false,
    },
  },
};
