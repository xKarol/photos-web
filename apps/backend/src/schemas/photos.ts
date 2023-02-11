import { z } from "zod";
import { paginationSchema } from "./pagination";

export const getPhotosSchema = z.object({
  query: paginationSchema(),
});

export type GetPhotosSchema = z.infer<typeof getPhotosSchema>;

export const deletePhotoSchema = z.object({
  params: z.object({
    photoId: z.string({ required_error: "PhotoId is required." }),
  }),
});

export type DeletePhotoSchema = z.infer<typeof deletePhotoSchema>;

export const getPhotoSchema = z.object({
  params: z.object({
    photoId: z.string({ required_error: "PhotoId is required." }),
  }),
});

export type GetPhotoSchema = z.infer<typeof getPhotoSchema>;
