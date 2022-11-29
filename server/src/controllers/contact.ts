import type { NextFunction, Request, Response } from "express";

import { prisma } from "../db";
import type { ContactCreateSchema } from "../schemas/contact";
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
