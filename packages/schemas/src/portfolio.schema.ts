import { z } from "zod";
import type { API } from "@app/types";

export type CreatePortfolio = Pick<API["Portfolios"]["Create"], "name"> & {
  images: string[];
};

export const createPortfolio: z.Schema<CreatePortfolio> = z.object({
  name: z.string().min(3),
  images: z.array(z.string()),
});

export const requiredPortfolioSlug = z.object({
  slug: z.string({
    required_error: "Portfolio slug is required.",
  }),
});

export type RequiredSlug = { slug: string };
export const deletePortfolio: z.Schema<RequiredSlug> = requiredPortfolioSlug;

export type updatePortfolioName = { name: string };
export const updatePortfolioName: z.Schema<updatePortfolioName> = z.object({
  name: z.string({ required_error: "Name is required." }).min(3),
});

export type updatePortfolioImages = { images: string[] };
export const updatePortfolioImages: z.Schema<updatePortfolioImages> = z.object({
  images: z.array(z.string()),
});
