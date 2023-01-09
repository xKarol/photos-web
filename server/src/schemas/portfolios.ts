import { z } from "zod";

import { paginationSchema } from "./pagination";

export const createPortfolioSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    images: z.array(z.string()),
  }),
});
export type CreatePortfolioSchema = z.infer<typeof createPortfolioSchema>;

export const getPortfoliosSchema = z.object({
  query: paginationSchema(),
});

export type GetPortfoliosSchema = z.infer<typeof getPortfoliosSchema>;

const requiredIdSchema = z.string({
  required_error: "portfolioId is required.",
});

export const deletePortfolioSchema = z.object({
  params: z.object({
    portfolioId: requiredIdSchema,
  }),
});

export type DeletePortfolioSchema = z.infer<typeof deletePortfolioSchema>;

export const getPortfolioSchema = z.object({
  params: z.object({
    portfolioId: requiredIdSchema,
  }),
});

export type GetPortfolioSchema = z.infer<typeof getPortfolioSchema>;

export const updatePortfolioNameSchema = z.object({
  params: z.object({
    portfolioId: requiredIdSchema,
  }),
  body: z.object({
    name: z.string({ required_error: "Name is required." }).min(3),
  }),
});

export type UpdatePortfolioNameSchema = z.infer<
  typeof updatePortfolioNameSchema
>;

export const updatePortfolioImagesSchema = z.object({
  params: z.object({
    portfolioId: requiredIdSchema,
  }),
  body: z.object({
    images: z.array(z.string()),
  }),
});

export type UpdatePortfolioImagesSchema = z.infer<
  typeof updatePortfolioImagesSchema
>;
