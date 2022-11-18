/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import type { ReportError } from "../utils/error";
import logger from "../utils/logger";

export const errorHandler = (
  error: ReportError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.status || 400;
  logger.error(error);
  res.status(status).send({ status: status, message: error.message });
};
