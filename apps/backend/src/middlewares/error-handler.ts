/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { reportError } from "../utils/error";
import logger from "../utils/logger";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const e = reportError(error);
  const status = e.status || 400;
  logger.error(e);
  res.status(status).send({
    status: status,
    message: e.message,
    ...(process.env.NODE_ENV !== "production" && { stack: e.stack }),
  });
};
