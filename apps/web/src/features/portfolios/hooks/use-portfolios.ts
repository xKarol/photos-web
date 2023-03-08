import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Image, Pagination, Portfolios } from "types";
import { getPortfolios } from "../../../services/portfolios";
import { portfolioKeys } from "../queries";

const transformData = (
  data: InfiniteData<
    Pagination<
      (Portfolios & {
        images: Image[];
      })[]
    >
  >
) => {
  return data?.pages.flatMap(({ data }) => data) || [];
};

const usePortfolios = () => {
  const response = useInfiniteQuery({
    queryKey: portfolioKeys.all,
    queryFn: ({ pageParam = 1 }) => getPortfolios(pageParam ?? 1),
    getNextPageParam: ({ nextPage }) => nextPage,
  });
  return { ...response, data: transformData(response.data) };
};

export default usePortfolios;
