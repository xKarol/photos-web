import type { API } from "@app/types";

import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { queryOptions } from "../config/query-options";

const transformData = (data: InfiniteData<API["Portfolios"]["Get"]>) => {
  return data?.pages.flatMap(({ data }) => data) || [];
};

const usePortfolios = () => {
  const response = useInfiniteQuery(queryOptions.all);
  return { ...response, data: transformData(response.data) };
};

export default usePortfolios;
