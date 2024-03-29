import type { Portfolio } from "@app/types";

import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { queryOptions } from "../config/react-query";

const transformData = (
  data: InfiniteData<Portfolio.ApiResponse["findAll"]>
) => {
  return data?.pages.flatMap(({ data }) => data) || [];
};

const usePortfolios = (...args: Parameters<typeof queryOptions.findAll>) => {
  const response = useInfiniteQuery(queryOptions.findAll(...args));
  return { ...response, data: transformData(response.data) };
};

export default usePortfolios;
