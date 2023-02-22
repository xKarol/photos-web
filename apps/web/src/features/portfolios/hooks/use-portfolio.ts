import { useQuery } from "react-query";
import { getPortfolio } from "../../../services/portfolios";

const usePortfolio = (slug: string) => {
  return useQuery(["portfolio", slug], () => getPortfolio(slug));
};

export default usePortfolio;
