import { apiUrls } from "@app/config";
import type { Portfolio } from "@app/types";

import axios from "../../../libs/axios";

export const getPortfolios: Portfolio.Api["findAll"] = async (params) => {
  const { data } = await axios.get(apiUrls.portfolio.findAll, {
    params,
  });
  return data;
};

export const getPortfolio: Portfolio.Api["findOne"] = async (slug) => {
  const { data } = await axios.get(apiUrls.portfolio.findOne(slug));
  return data;
};
