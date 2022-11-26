import type { NextFunction, Request, Response } from "express";

import { prisma } from "../db";
import type { NewsletterSubscribeSchema } from "../schemas/newsletter";
import { sendEmail } from "../utils/mailer";

export const Subscribe = async (
  req: Request<any, any, NewsletterSubscribeSchema["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const subscriber = await prisma.newsletterSubscriber.create({ data: data });
    await sendEmail({
      subject: "Newsletter",
      to: data.email,
      text: "Thanks for subscribe to our newsletter",
    });
    return res.send(subscriber);
  } catch (error) {
    next(error);
  }
};
