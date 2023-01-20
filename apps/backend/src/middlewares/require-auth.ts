/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO checking auth
    next();
  } catch (e) {
    next(e);
  }
};
