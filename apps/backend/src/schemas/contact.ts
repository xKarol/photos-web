import { contact as Schema } from "@app/schemas";
import { z } from "zod";

export const createContact = z.object({
  body: Schema.createContact,
});

export type CreateContact = z.infer<typeof createContact>;

export const deleteContact = z.object({
  params: Schema.deleteContact,
});

export type DeleteContact = z.infer<typeof deleteContact>;
