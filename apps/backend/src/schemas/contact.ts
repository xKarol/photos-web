import { z } from "zod";

export const contactCreateSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: "First Name is required." }).min(2),
    lastName: z.string({ required_error: "Last Name is required." }).min(2),
    email: z.string({ required_error: "Email is required." }).email(),
    subject: z.string({ required_error: "Subject is required." }).min(3),
    message: z.string({ required_error: "Message is required." }).min(25),
  }),
});

export type ContactCreateSchema = z.infer<typeof contactCreateSchema>;

export const contactDeleteSchema = z.object({
  params: z.object({
    contactId: z.string({ required_error: "contactId is required." }),
  }),
});

export type ContactDeleteSchema = z.infer<typeof contactDeleteSchema>;
