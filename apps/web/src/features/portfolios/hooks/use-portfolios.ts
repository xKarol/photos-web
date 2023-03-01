import { useInfiniteQuery } from "@tanstack/react-query";
import { getPortfolios } from "../../../services/portfolios";

const usePortfolios = () => {
  const response = useInfiniteQuery({
    queryKey: ["portfolio"],
    queryFn: ({ pageParam = 1 }) => getPortfolios(pageParam),
    getNextPageParam: ({ nextPage }) => nextPage,
  });
  const portfolios = response.data?.pages.flatMap(({ data }) => data) || [];
  return { ...response, data: portfolios };
};

export default usePortfolios;
