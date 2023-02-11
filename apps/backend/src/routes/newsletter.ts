import express from "express";
import * as newsletterController from "../controllers/newsletter";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";
import * as Schema from "../schemas/newsletter";

const router = express.Router();

router.post(
  "/newsletter/subscribe",
  validateSchema(Schema.subscribeNewsletter),
  newsletterController.Subscribe
);

router.post(
  "/newsletter/template",
  requireAuth,
  validateSchema(Schema.createNewsletterTemplate),
  newsletterController.CreateTemplate
);

export default router;
