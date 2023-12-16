import type { Newsletter } from "@app/types";

import type { NextFunction, Request, Response } from "express";

import type * as Schema from "../schemas/newsletter";
import { subscribeToNewsletter } from "../services/newsletter";

export const Subscribe = async (
  req: Request<unknown, unknown, Schema.SubscribeNewsletter["body"]>,
  res: Response<Newsletter.ApiResponse["subscribe"]>,
  next: NextFunction
) => {
  try {
    await subscribeToNewsletter(req.body);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
