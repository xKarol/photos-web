import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "../config/query-options";

const usePortfolio = (slug: string) => {
  const { data, ...rest } = useQuery(queryOptions.one(slug));

  const { images = [], ...restData } = data || {};
  const portfolioData = { ...restData, images };
  return { data: portfolioData, ...rest };
};

export default usePortfolio;
