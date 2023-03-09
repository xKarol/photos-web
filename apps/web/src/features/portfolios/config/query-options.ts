import type {
  FetchInfiniteQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { API } from "types";
import { getPortfolio, getPortfolios } from "../../../services/portfolios";
import { portfolioKeys } from "./query-keys";

const portfoliosOptions: FetchInfiniteQueryOptions<API["Portfolios"]["Get"]> = {
  queryKey: portfolioKeys.all,
  queryFn: ({ pageParam = 1 }) => getPortfolios(pageParam ?? 1),
  getNextPageParam: ({ nextPage }) => nextPage,
};

const portfolioOptions = (
  slug: string
): UseQueryOptions<API["Portfolios"]["GetOne"]> => ({
  queryKey: portfolioKeys.one(slug),
  queryFn: () => getPortfolio(slug),
});

export const queryOptions = {
  all: portfoliosOptions,
  one: portfolioOptions,
};
