import { useQuery } from "@tanstack/react-query";

import { queryOptions } from "../config/react-query";

const usePortfolio = (...args: Parameters<typeof queryOptions.findOne>) => {
  const { data, ...rest } = useQuery(queryOptions.findOne(...args));

  const { images = [], ...restData } = data || {};
  const portfolioData = { ...restData, images };
  return { data: portfolioData, ...rest };
};

export default usePortfolio;
