import type { API } from "types";
import axios from "../../../libs/axios";

export async function getPortfolios(
  page = 1,
  limit = 10
): Promise<API["Portfolios"]["Get"]> {
  const { data } = await axios.get(`/portfolios?page=${page}&limit=${limit}`);
  return data;
}

export async function getPortfolio(
  slug: string
): Promise<API["Portfolios"]["GetOne"]> {
  const { data } = await axios.get(`/portfolios/${slug}`);
  return data;
}
