import { z } from "zod";

export const newsletterSubscribeSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required." }).email(),
  }),
});

export type NewsletterSubscribeSchema = z.infer<
  typeof newsletterSubscribeSchema
>;

export const newsletterCreateTemplateSchema = z.object({
  body: z.object({
    subject: z.string({ required_error: "Subject is required." }).min(10),
    content: z.string({ required_error: "Content is required." }).min(100),
    sendAt: z
      .number({
        required_error: "Set 'sendAt' field when email should be send.",
      })
      .min(Date.now()),
  }),
});

export type NewsletterCreateTemplateSchema = z.infer<
  typeof newsletterCreateTemplateSchema
>;
