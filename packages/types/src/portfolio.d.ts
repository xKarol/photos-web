import { Pagination, PaginationParams, ServerPaginationParams } from "./global";
import type { Image, Portfolios } from "@app/prisma";

type ReturnStatus = void | unknown;

export interface Api {
  create: (payload: CreatePortfolioPayload) => Promise<ApiResponse["create"]>;
  findOne: (slug: string) => Promise<ApiResponse["findOne"]>;
  findAll: (params?: PaginationParams) => Promise<ApiResponse["findAll"]>;
  delete: (portfolioSlug: string) => Promise<ApiResponse["delete"]>;
  updateName: (portfolioSlug: string) => Promise<ApiResponse["updateName"]>;
  updateImages: (portfolioSlug: string) => Promise<ApiResponse["updateImages"]>;
}

// @ts-expect-error
export interface Services extends Api {
  findAll: (params: ServerPaginationParams) => Promise<ApiResponse["findAll"]>;
  updateName: (
    portfolioSlug: string,
    newName: string
  ) => Promise<ApiResponse["updateName"]>;
  updateImages: (
    portfolioSlug: string,
    newIages: string[]
  ) => Promise<ApiResponse["updateImages"]>;
  delete: (portfolioSlug: string) => Promise<Portfolios>;
}

export type ApiResponse = {
  create: Portfolios & { images: Image[] };
  findOne: Portfolios & { images: Image[] };
  findAll: Pagination<(Portfolios & { images: Image[] })[]>;
  delete: ReturnStatus;
  updateName: Portfolios;
  updateImages: Portfolios & { images: Image[] };
};

export type CreatePortfolioPayload = {
  name: string;
  images: string[];
};
