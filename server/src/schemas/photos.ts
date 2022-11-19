import { z } from "zod";

import { stringAsNumber } from ".";

export const getPhotosSchema = z.object({
  query: z.object({
    page: stringAsNumber().optional(),
    limit: stringAsNumber().optional(),
  }),
});

export type GetPhotosSchema = z.infer<typeof getPhotosSchema>;

export const deletePhotoSchema = z.object({
  params: z.object({
    photoId: z.string({ required_error: "PhotoId is required." }),
  }),
});

export type DeletePhotoSchema = z.infer<typeof deletePhotoSchema>;
