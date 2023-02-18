import { z } from "zod";
import { stringAsNumber } from "./misc";

export const getImageSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
export type GetImageSchema = z.infer<typeof getImageSchema>;

export const getImagePlaceholderSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  query: z.object({
    width: stringAsNumber().default("300"),
    height: stringAsNumber().default("300"),
  }),
});
export type GetImagePlaceholderSchema = z.infer<
  typeof getImagePlaceholderSchema
>;
