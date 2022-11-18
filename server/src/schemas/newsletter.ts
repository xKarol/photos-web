import { z } from "zod";

export const newsletterSubscribeSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export type NewsletterSubscribeSchema = z.infer<
  typeof newsletterSubscribeSchema
>;
