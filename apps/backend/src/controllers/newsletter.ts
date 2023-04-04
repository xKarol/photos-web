import type { NextFunction, Request, Response } from "express";
import type { API } from "@app/types";
import type * as Schema from "../schemas/newsletter";
import { subscribeToNewsletter } from "../services/newsletter";

export const Subscribe = async (
  req: Request<unknown, unknown, Schema.SubscribeNewsletter["body"]>,
  res: Response<API["Newsletter"]["Subscribe"]>,
  next: NextFunction
) => {
  try {
    await subscribeToNewsletter(req.body);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
