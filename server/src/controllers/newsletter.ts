import type { NextFunction, Request, Response } from "express";

import { prisma } from "../db";

export const Subscribe = async (
  req: Request,
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
