import { z } from "zod";

export const errorSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export type ErrorSchema = z.infer<typeof errorSchema>;
