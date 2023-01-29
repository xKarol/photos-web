import type { NextFunction, Request, Response } from "express";
import type { API } from "types";

import { prisma } from "../db";
import type * as Schema from "../schemas/newsletter";
import { sendEmail } from "../utils/mailer";

export const Subscribe = async (
  req: Request<unknown, unknown, Schema.SubscribeNewsletter["body"]>,
  res: Response<API["Newsletter"]["Subscribe"]>,
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

export const CreateTemplate = async (
  req: Request<unknown, unknown, Schema.CreateNewsletterTemplate["body"]>,
  res: Response<API["Newsletter"]["CreateTemplate"]>,
  next: NextFunction
) => {
  try {
    const { sendAt, ...data } = req.body;
    const newTemplate = await prisma.newsletterTemplate.create({
      data: {
        sendAt: new Date(sendAt),
        ...data,
      },
    });

    return res.send(newTemplate);
  } catch (error) {
    next(error);
  }
};