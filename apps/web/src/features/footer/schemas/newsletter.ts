import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string({ required_error: "Email is required." }).email(),
});

export type NewsletterSchema = z.infer<typeof newsletterSchema>;
