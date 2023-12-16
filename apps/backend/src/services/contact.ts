import prisma from "@app/prisma";
import type { Contact } from "@app/types";

import createError from "http-errors";

export const createContact: Contact.Services["create"] = async (data) => {
  try {
    const contact = await prisma.contact.create({ data });
    return contact;
  } catch {
    throw createError(400, "Could not create contact");
  }
};

export const deleteContact: Contact.Services["delete"] = async (contactId) => {
  try {
    const response = await prisma.contact.delete({ where: { id: contactId } });
    return response;
  } catch {
    throw createError(404, "Contact not found.");
  }
};
