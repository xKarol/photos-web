import { prisma } from "database";
import type { NextFunction, Request, Response } from "express";

import type {
  ContactCreateSchema,
  ContactDeleteSchema,
} from "../schemas/contact";
import { sendEmail } from "../utils/mailer";

export const Create = async (
  req: Request<any, any, ContactCreateSchema["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const contact = await prisma.contact.create({ data: data });
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
  req: Request<ContactDeleteSchema["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { contactId } = req.params;

    await prisma.contact.delete({ where: { id: contactId } });

    return res.send(200);
  } catch (error) {
    next(error);
  }
};
