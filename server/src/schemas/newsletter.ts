import { z } from "zod";

export const newsletterSubscribeSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required." }).email(),
  }),
});

export type NewsletterSubscribeSchema = z.infer<
  typeof newsletterSubscribeSchema
>;
