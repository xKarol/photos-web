import { z } from "zod";

export const errorSchema = z.object({
  status: z.number(),
  message: z.string(),
  stack: z.string().optional(),
});

export type ErrorSchema = z.infer<typeof errorSchema>;
