import type { Portfolio } from "@app/types";
import { z } from "zod";

export const createPortfolio: z.Schema<Portfolio.CreatePortfolioPayload> =
  z.object({
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
