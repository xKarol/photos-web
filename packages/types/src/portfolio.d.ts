import { Pagination, PaginationParams, ServerPaginationParams } from "./global";
import type { Image, Portfolios } from "@app/prisma";

type ReturnStatus = void | unknown;

export interface Api {
  create: (
    payload: CreatePortfolioPayload
  ) => Promise<Portfolios & { images: Image[] }>;
  findOne: (slug: string) => Promise<Portfolios & { images: Image[] }>;
  findAll: (
    params?: PaginationParams
  ) => Promise<Pagination<(Portfolios & { images: Image[] })[]>>;
  delete: (portfolioSlug: string) => Promise<ReturnStatus>;
  updateName: (portfolioSlug: string) => Promise<Portfolios>;
  updateImages: (
    portfolioSlug: string
  ) => Promise<Portfolios & { images: Image[] }>;
}

// @ts-expect-error
export interface Services extends Api {
  findAll: (
    params: ServerPaginationParams
  ) => Promise<Pagination<(Portfolios & { images: Image[] })[]>>;
  updateName: (portfolioSlug: string, newName: string) => Promise<Portfolios>;
  updateImages: (
    portfolioSlug: string,
    newIages: string[]
  ) => Promise<Portfolios & { images: Image[] }>;
  delete: (portfolioSlug: string) => Promise<Portfolios>;
}

export type CreatePortfolioPayload = {
  slug: string;
  name: string;
  images: string[];
};
