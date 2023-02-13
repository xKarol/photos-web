import createError from "http-errors";
import { prisma } from "../lib/prisma";
import type * as Schema from "../schemas/contact";

export const createContact = async (data: Schema.CreateContact["body"]) => {
  const contact = await prisma.contact.create({ data: data });
  if (!contact) throw createError(400, "Could not create contact");
  return contact;
};

export const deleteContact = async ({
  contactId,
}: Schema.DeleteContact["params"]) => {
  try {
    const response = await prisma.contact.delete({ where: { id: contactId } });
    return response;
  } catch {
    throw createError(404, "Contact not found.");
  }
};
