import { useInfiniteQuery } from "react-query";
import { getPortfolios } from "../../../services/portfolios";

const usePortfolios = () => {
  const response = useInfiniteQuery(
    "portfolio",
    ({ pageParam: page = 1 }) => getPortfolios(page),
    {
      getNextPageParam: ({ nextPage }) => nextPage,
    }
  );
  const portfolios = response.data?.pages.flatMap(({ data }) => data) || [];
  return { ...response, data: portfolios };
};

export default usePortfolios;
