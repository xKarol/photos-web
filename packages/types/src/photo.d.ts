import { Pagination, PaginationParams, ServerPaginationParams } from "./global";
import { Image, Photos } from "@app/prisma";

type ReturnStatus = void | unknown;

export interface Api {
  create: (payload: CreatePhotoPayload) => Promise<Image>;
  findOne: (photoId: string) => Promise<Image>;
  findAll: (params: PaginationParams) => Promise<Pagination<Image[]>>;
  delete: (photoId: string) => Promise<ReturnStatus>;
}

export interface Services extends Api {
  delete: (photoId: string) => Promise<{ imageId: string }>;
  findAll: (params: ServerPaginationParams) => Promise<Pagination<Image[]>>;
}

export type CreatePhotoPayload = Pick<
  Image,
  "alt" | "height" | "width" | "mimeType" | "src" | "placeholder" | "id"
>;
