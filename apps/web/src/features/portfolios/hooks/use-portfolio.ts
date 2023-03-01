import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../../../services/portfolios";

const usePortfolio = (slug: string) => {
  const { data, ...rest } = useQuery(["portfolio", slug], () =>
    getPortfolio(slug)
  );
  const { images = [], ...restData } = data || {};
  const portfolioData = { ...restData, images };
  return { data: portfolioData, ...rest };
};

export default usePortfolio;
