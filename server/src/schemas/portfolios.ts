import { z } from "zod";

import { stringAsNumber } from ".";

export const createPortfolioSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    images: z.array(z.string()),
  }),
});
export type CreatePortfolioSchema = z.infer<typeof createPortfolioSchema>;

export const getPortfoliosSchema = z.object({
  query: z.object({
    page: stringAsNumber().optional(),
    limit: stringAsNumber().optional(),
  }),
});

export type GetPortfoliosSchema = z.infer<typeof getPortfoliosSchema>;

export const deletePortfolioSchema = z.object({
  params: z.object({
    portfolioId: z.string({ required_error: "portfolioId is required." }),
  }),
});

export type DeletePortfolioSchema = z.infer<typeof deletePortfolioSchema>;

export const getPortfolioSchema = z.object({
  params: z.object({
    portfolioId: z.string({ required_error: "portfolioId is required." }),
  }),
});

export type GetPortfolioSchema = z.infer<typeof getPortfolioSchema>;
