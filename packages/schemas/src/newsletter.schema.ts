import { z } from "zod";
import type { toZod } from "tozod";
import type { API } from "types";

export type SubscribeNewsletter = Pick<API["Newsletter"]["Subscribe"], "email">;

export const subscribeNewsletter: toZod<SubscribeNewsletter> = z.object({
  email: z.string({ required_error: "Email is required." }).email(),
});

export type createNewsletterTemplate = Pick<
  API["Newsletter"]["CreateTemplate"],
  "subject" | "content" | "sendAt"
>;

export const createNewsletterTemplate: toZod<createNewsletterTemplate> =
  z.object({
    subject: z.string({ required_error: "Subject is required." }).min(10),
    content: z.string({ required_error: "Content is required." }).min(100),
    sendAt: z
      .date({
        required_error: "sendAt field is required.",
      })
      .min(new Date()),
  });
