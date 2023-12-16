import { apiUrls } from "@app/config";
import type { API } from "@app/types";

import axios from "../../../libs/axios";

export async function getPortfolios(
  page = 1,
  limit = 10
): Promise<API["Portfolios"]["Get"]> {
  const { data } = await axios.get(apiUrls.portfolio.findAll, {
    params: {
      page,
      limit,
    },
  });
  return data;
}

export async function getPortfolio(
  slug: string
): Promise<API["Portfolios"]["GetOne"]> {
  const { data } = await axios.get(apiUrls.portfolio.findOne(slug));
  return data;
}
