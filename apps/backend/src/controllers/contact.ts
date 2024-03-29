import type { Contact } from "@app/types";

import type { NextFunction, Request, Response } from "express";

import type * as Schema from "../schemas/contact";
import { createContact, deleteContact } from "../services/contact";
import { sendEmail } from "../utils/mailer";

export const Create = async (
  req: Request<unknown, unknown, Schema.CreateContact["body"]>,
  res: Response<Contact.ApiResponse["create"]>,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const contact = await createContact(data);
    await sendEmail({
      subject: "Contact",
      to: data.email,
      text: "Your message has been sent to us. Wait for the response.",
    });
    return res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const Delete = async (
  req: Request<Schema.DeleteContact["params"]>,
  res: Response<Contact.ApiResponse["delete"]>,
  next: NextFunction
) => {
  try {
    const { contactId } = req.params;
    await deleteContact(contactId);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
