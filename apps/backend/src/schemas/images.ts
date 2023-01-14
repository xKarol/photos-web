import { z } from "zod";

export const getImageSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export type GetImageSchema = z.infer<typeof getImageSchema>;
