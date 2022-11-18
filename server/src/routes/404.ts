import express, { type NextFunction } from "express";
import createError from "http-errors";

import { reportError } from "../utils/error";

const router = express.Router();

router.all("*", (req, res, next: NextFunction) =>
  next(reportError(createError(404, "Not found")))
);

export default router;
