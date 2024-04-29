import type {
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

import { getPortfolio, getPortfolios } from "../services/portfolios";

export const queryKeys = {
  findAll: ["portfolios"],
  findOne: (slug: string) => [...queryKeys.findAll, slug] as const,
} as const;

export const queryOptions = {
  findAll: (
    options?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPortfolios>>>
  ): UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPortfolios>>> => ({
    ...options,
    queryKey: queryKeys.findAll,
    queryFn: ({ pageParam = 1 }) =>
      getPortfolios({ page: pageParam ?? 1, limit: 10 }),
    getNextPageParam: ({ nextPage }) => nextPage,
  }),
  findOne: (
    slug: string,
    options?: UseQueryOptions<Awaited<ReturnType<typeof getPortfolio>>>
  ): UseQueryOptions<Awaited<ReturnType<typeof getPortfolio>>> => ({
    ...options,
    queryKey: queryKeys.findOne(slug),
    queryFn: () => getPortfolio(slug),
  }),
} satisfies Record<keyof typeof queryKeys, unknown>;
