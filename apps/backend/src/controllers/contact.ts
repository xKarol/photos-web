import type { NextFunction, Request, Response } from "express";
import type { API } from "types";
import type * as Schema from "../schemas/contact";
import { createContact, deleteContact } from "../services/contact";
import { sendEmail } from "../utils/mailer";

export const Create = async (
  req: Request<unknown, unknown, Schema.CreateContact["body"]>,
  res: Response<API["Contact"]["Create"]>,
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
  res: Response<API["Contact"]["Delete"]>,
  next: NextFunction
) => {
  try {
    const { contactId } = req.params;
    await deleteContact({ contactId });

    return res.send(200);
  } catch (error) {
    next(error);
  }
};
