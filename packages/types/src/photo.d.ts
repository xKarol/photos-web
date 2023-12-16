import { Pagination, PaginationParams } from "./global";
import { Image } from "@app/prisma";

type ReturnStatus = void | unknown;

export interface Api {
  create: (payload: CreatePhotoPayload) => Promise<Image>;
  findOne: (photoId: string) => Promise<Image>;
  findAll: (params: PaginationParams) => Promise<Pagination<Image[]>>;
  delete: (photoId: string) => Promise<ReturnStatus>;
}

export interface Services extends Api {
  delete: (photoId: string) => Promise<{ imageId: string }>;
}

export type CreatePhotoPayload = Pick<
  Image,
  "alt" | "height" | "width" | "mimeType" | "src" | "placeholder" | "id"
>;
