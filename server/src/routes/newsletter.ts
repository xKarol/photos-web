import express, { type NextFunction } from "express";

import { prisma } from "../db";
import { reportError } from "../utils/error";

const router = express.Router();

router.post("/newsletter/subscribe", async (req, res, next: NextFunction) => {
  try {
    const data = req.body;
    const subscriber = await prisma.newsletterSubscriber.create({ data: data });
    return res.send(subscriber);
  } catch (error) {
    next(reportError(error));
  }
});

export default router;
