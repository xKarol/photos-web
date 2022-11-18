import express, { type NextFunction } from "express";
import createError from "http-errors";

const router = express.Router();

router.all("*", (req, res, next: NextFunction) =>
  next(createError(404, "Not found"))
);

export default router;
