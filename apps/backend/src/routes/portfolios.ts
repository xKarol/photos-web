import { apiUrls } from "@app/config";

import express from "express";

import * as portfoliosController from "../controllers/portfolios";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";
import { withCache } from "../middlewares/with-cache";
import { withPagination } from "../middlewares/with-pagination";
import * as Schema from "../schemas/portfolios";

const router = express.Router();

router.get(
  apiUrls.portfolio.findAll,
  validateSchema(Schema.getPortfolios),
  withPagination,
  withCache("2 hours"),
  portfoliosController.Get
);

router.get(
  apiUrls.portfolio.findOne(":slug"),
  validateSchema(Schema.getPortfolio),
  withCache("2 hours"),
  portfoliosController.GetOne
);

router.post(
  apiUrls.portfolio.create,
  requireAuth,
  validateSchema(Schema.createPortfolio),
  portfoliosController.Create
);

router.delete(
  apiUrls.portfolio.delete(":slug"),
  requireAuth,
  validateSchema(Schema.deletePortfolio),
  portfoliosController.Delete
);

router.put(
  apiUrls.portfolio.updateImages(":slug"),
  requireAuth,
  validateSchema(Schema.updatePortfolioImages),
  portfoliosController.UpdateImages
);

router.put(
  apiUrls.portfolio.updateName(":slug"),
  requireAuth,
  validateSchema(Schema.updatePortfolioNameSchema),
  portfoliosController.UpdateName
);

export default router;
