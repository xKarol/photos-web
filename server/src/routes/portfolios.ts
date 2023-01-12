import express from "express";

import * as portfoliosController from "../controllers/portfolios";
import { validateSchema } from "../middlewares/validate-schema";
import {
  getPortfoliosSchema,
  createPortfolioSchema,
  getPortfolioSchema,
  deletePortfolioSchema,
  updatePortfolioNameSchema,
  updatePortfolioImagesSchema,
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
  "/portfolios/:slug",
  validateSchema(getPortfolioSchema),
  portfoliosController.GetOne
);

router.delete(
  "/portfolios/:slug",
  validateSchema(deletePortfolioSchema),
  portfoliosController.Delete
);

// Portfolio images

router.put(
  "/portfolios/:slug/images",
  validateSchema(updatePortfolioImagesSchema),
  portfoliosController.UpdateImages
);

router.put(
  "/portfolios/:slug/name",
  validateSchema(updatePortfolioNameSchema),
  portfoliosController.UpdateName
);

export default router;
