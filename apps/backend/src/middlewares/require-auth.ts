import type { NextFunction, Request, Response } from "express";
import createError from "http-errors";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.isAuthenticated()) throw createError(401, "Please log in.");
    next();
  } catch (e) {
    next(e);
  }
};
