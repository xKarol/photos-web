import { newsletter as Schema } from "schemas";
import { z } from "zod";

export const subscribeNewsletter = z.object({
  body: Schema.subscribeNewsletter,
});

export type SubscribeNewsletter = z.infer<typeof subscribeNewsletter>;

export const createNewsletterTemplate = z.object({
  body: Schema.createNewsletterTemplate,
});

export type CreateNewsletterTemplate = z.infer<typeof createNewsletterTemplate>;
