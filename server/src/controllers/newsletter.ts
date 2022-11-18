import type { NextFunction, Request, Response } from "express";

import { prisma } from "../db";
import type { NewsletterSubscribeSchema } from "../schemas/newsletter";

export const Subscribe = async (
  req: Request<any, any, NewsletterSubscribeSchema["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const subscriber = await prisma.newsletterSubscriber.create({ data: data });
    return res.send(subscriber);
  } catch (error) {
    next(error);
  }
};
