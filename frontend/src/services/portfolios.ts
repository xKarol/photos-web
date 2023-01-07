import axios from "axios";
import type { Portfolio } from "../@types/portfolios";

const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type PortfolioType = {
  data: Portfolio[];
  nextPage: number | undefined;
  limit: number;
};

export const getPortfolios = async (page = 1, limit = 10): Promise<PortfolioType> => {
  const { data } = await axios.get(
    `${SERVER_URL}/portfolios?page=${page}&limit=${limit}`
  );
  return data;
};

export const getPortfolio = async (photoId: string): Promise<Portfolio> => {
  const { data } = await axios.get(`${SERVER_URL}/portfolios/${photoId}`);
  return data;
};
