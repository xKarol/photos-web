import type {
  FetchInfiniteQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { API } from "@app/types";
import { getPortfolio, getPortfolios } from "../services/portfolios";
import { queryKeys } from "./query-keys";

const portfoliosOptions: FetchInfiniteQueryOptions<API["Portfolios"]["Get"]> = {
  queryKey: queryKeys.all,
  queryFn: ({ pageParam = 1 }) => getPortfolios(pageParam ?? 1),
  getNextPageParam: ({ nextPage }) => nextPage,
};

const portfolioOptions = (
  slug: string
): UseQueryOptions<API["Portfolios"]["GetOne"]> => ({
  queryKey: queryKeys.one(slug),
  queryFn: () => getPortfolio(slug),
});

export const queryOptions = {
  all: portfoliosOptions,
  one: portfolioOptions,
} satisfies Record<keyof typeof queryKeys, unknown>;
