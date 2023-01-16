import axios from "axios";
import type { API } from "types";

const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getPortfolios(
  page = 1,
  limit = 10
): Promise<API["Portfolios"]["Get"]> {
  const { data } = await axios.get(
    `${SERVER_URL}/portfolios?page=${page}&limit=${limit}`
  );
  return data;
}

export async function getPortfolio(
  slug: string
): Promise<API["Portfolios"]["GetOne"]> {
  const { data } = await axios.get(`${SERVER_URL}/portfolios/${slug}`);
  return data;
}
