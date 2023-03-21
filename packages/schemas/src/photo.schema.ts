import { z } from "zod";

export type DeletePhoto = { photoId: string };
export const deletePhoto: z.Schema<DeletePhoto> = z.object({
  photoId: z.string({ required_error: "PhotoId is required." }),
});
