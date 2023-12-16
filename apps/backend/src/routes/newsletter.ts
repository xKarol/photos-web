import { apiUrls } from "@app/config";

import express from "express";

import * as newsletterController from "../controllers/newsletter";
import { validateSchema } from "../middlewares/validate-schema";
import * as Schema from "../schemas/newsletter";

const router = express.Router();

router.post(
  apiUrls.newsletter.subscribe,
  validateSchema(Schema.subscribeNewsletter),
  newsletterController.Subscribe
);

export default router;
