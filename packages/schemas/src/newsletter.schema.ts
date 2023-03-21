import { z } from "zod";

export type SubscribeNewsletter = { email: string };

export const subscribeNewsletter: z.Schema<SubscribeNewsletter> = z.object({
  email: z.string({ required_error: "Email is required." }).email(),
});
