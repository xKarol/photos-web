import prisma from "@app/prisma";

import createError from "http-errors";

import type * as Schema from "../schemas/contact";

export const createContact = async (data: Schema.CreateContact["body"]) => {
  try {
    const contact = await prisma.contact.create({ data: data });
    return contact;
  } catch {
    throw createError(400, "Could not create contact");
  }
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
