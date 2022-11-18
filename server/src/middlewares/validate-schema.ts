import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { reportError } from "../utils/error";

export const validateSchema =
  (schema: z.AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(reportError(error));
    }
  };
