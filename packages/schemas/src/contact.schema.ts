import { z } from "zod";
import type { toZod } from "tozod";
import type { API } from "types";

export type CreateSchema = Pick<
  API["Contact"]["Create"],
  "firstName" | "lastName" | "email" | "subject" | "message"
>;

export const createContact: toZod<CreateSchema> = z.object({
  firstName: z.string({ required_error: "First Name is required." }).min(2),
  lastName: z.string({ required_error: "Last Name is required." }).min(2),
  email: z.string({ required_error: "Email is required." }).email(),
  subject: z.string({ required_error: "Subject is required." }).min(3),
  message: z.string({ required_error: "Message is required." }).min(25),
});

type DeleteContact = { contactId: string };

export const deleteContact: toZod<DeleteContact> = z.object({
  contactId: z.string({ required_error: "contactId is required." }),
});
