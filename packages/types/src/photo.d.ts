import { Pagination, PaginationParams, ServerPaginationParams } from "./global";
import { Image, Photos } from "@app/prisma";

type ReturnStatus = void | unknown;

export interface Api {
  create: (payload: CreatePhotoPayload) => Promise<ApiResponse["create"]>;
  findOne: (photoId: string) => Promise<ApiResponse["findOne"]>;
  findAll: (params: PaginationParams) => Promise<ApiResponse["findAll"]>;
  delete: (photoId: string) => Promise<ApiResponse["delete"]>;
}

export interface Services extends Api {
  delete: (photoId: string) => Promise<{ imageId: string }>;
  findAll: (params: ServerPaginationParams) => Promise<ApiResponse["findAll"]>;
}

export type ApiResponse = {
  create: Image;
  findOne: Image;
  findAll: Pagination<Image[]>;
  delete: ReturnStatus;
};

export type CreatePhotoPayload = Pick<
  Image,
  "alt" | "height" | "width" | "mimeType" | "src" | "placeholder" | "id"
>;
