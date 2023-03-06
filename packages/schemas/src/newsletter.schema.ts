import { z } from "zod";
import type { toZod } from "tozod";
import type { API } from "types";

export type SubscribeNewsletter = { email: string };

export const subscribeNewsletter: toZod<SubscribeNewsletter> = z.object({
  email: z.string({ required_error: "Email is required." }).email(),
});
