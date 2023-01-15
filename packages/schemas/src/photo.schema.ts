import { z } from "zod";
import type { toZod } from "tozod";

export type DeletePhoto = { photoId: string };
export const deletePhoto: toZod<DeletePhoto> = z.object({
  photoId: z.string({ required_error: "PhotoId is required." }),
});
