import express from "express";

import * as portfoliosController from "../controllers/portfolios";
import { validateSchema } from "../middlewares/validate-schema";
import {
  getPortfoliosSchema,
  createPortfolioSchema,
  getPortfolioSchema,
  deletePortfolioSchema,
} from "../schemas/portfolios";

const router = express.Router();

router.get(
  "/portfolios",
  validateSchema(getPortfoliosSchema),
  portfoliosController.Get
);

router.post(
  "/portfolios",
  validateSchema(createPortfolioSchema),
  portfoliosController.Create
);

router.get(
  "/portfolios/:id",
  validateSchema(getPortfolioSchema),
  portfoliosController.GetOne
);

router.delete(
  "/portfolios/:id",
  validateSchema(deletePortfolioSchema),
  portfoliosController.Delete
);

export default router;
