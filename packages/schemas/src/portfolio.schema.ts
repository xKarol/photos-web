import { z } from "zod";
import { toZod } from "tozod";
import type { API } from "types";

export type CreatePortfolio = Pick<API["Portfolios"]["Create"], "name"> & {
  images: string[];
};

export const createPortfolio: toZod<CreatePortfolio> = z.object({
  name: z.string().min(3),
  images: z.array(z.string()),
});

export const requiredPortfolioSlug = z.object({
  slug: z.string({
    required_error: "Portfolio slug is required.",
  }),
});

export type RequiredSlug = { slug: string };
export const deletePortfolio: toZod<RequiredSlug> = requiredPortfolioSlug;

export type updatePortfolioName = { name: string };
export const updatePortfolioName: toZod<updatePortfolioName> = z.object({
  name: z.string({ required_error: "Name is required." }).min(3),
});

export type updatePortfolioImages = { images: string[] };
export const updatePortfolioImages: toZod<updatePortfolioImages> = z.object({
  images: z.array(z.string()),
});
