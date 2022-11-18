import express from "express";

import * as newsletterController from "../controllers/newsletter";
import { validateSchema } from "../middlewares/validate-schema";
import { newsletterSubscribeSchema } from "../schemas/newsletter";

const router = express.Router();

router.post(
  "/newsletter/subscribe",
  validateSchema(newsletterSubscribeSchema),
  newsletterController.Subscribe
);

export default router;
