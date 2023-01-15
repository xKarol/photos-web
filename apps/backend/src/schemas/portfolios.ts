import { portfolio as Schema } from "schemas";
import { z } from "zod";

import { paginationSchema } from "./pagination";

export const createPortfolio = z.object({
  body: Schema.createPortfolio,
});
export type CreatePortfolio = z.infer<typeof createPortfolio>;

export const getPortfolios = z.object({
  query: paginationSchema(),
});

export type GetPortfolios = z.infer<typeof getPortfolios>;

export const deletePortfolio = z.object({
  params: Schema.requiredPortfolioSlug,
});

export type DeletePortfolio = z.infer<typeof deletePortfolio>;

export const getPortfolio = z.object({
  params: Schema.requiredPortfolioSlug,
});

export type GetPortfolio = z.infer<typeof getPortfolio>;

export const updatePortfolioNameSchema = z.object({
  params: Schema.requiredPortfolioSlug,
  body: Schema.updatePortfolioName,
});

export type UpdatePortfolioName = z.infer<typeof updatePortfolioNameSchema>;

export const updatePortfolioImages = z.object({
  params: Schema.requiredPortfolioSlug,
  body: Schema.updatePortfolioImages,
});

export type UpdatePortfolioImages = z.infer<typeof updatePortfolioImages>;
