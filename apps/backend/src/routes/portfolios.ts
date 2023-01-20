import express from "express";

import * as portfoliosController from "../controllers/portfolios";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";
import * as Schema from "../schemas/portfolios";

const router = express.Router();

router.get(
  "/portfolios",
  validateSchema(Schema.getPortfolios),
  portfoliosController.Get
);

router.post(
  "/portfolios",
  requireAuth,
  validateSchema(Schema.createPortfolio),
  portfoliosController.Create
);

router.get(
  "/portfolios/:slug",
  validateSchema(Schema.getPortfolio),
  portfoliosController.GetOne
);

router.delete(
  "/portfolios/:slug",
  requireAuth,
  validateSchema(Schema.deletePortfolio),
  portfoliosController.Delete
);

// Portfolio images

router.put(
  "/portfolios/:slug/images",
  requireAuth,
  validateSchema(Schema.updatePortfolioImages),
  portfoliosController.UpdateImages
);

router.put(
  "/portfolios/:slug/name",
  requireAuth,
  validateSchema(Schema.updatePortfolioNameSchema),
  portfoliosController.UpdateName
);

export default router;
