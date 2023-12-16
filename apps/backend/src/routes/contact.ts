import { apiUrls } from "@app/config";

import express from "express";

import * as contactController from "../controllers/contact";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";
import * as Schema from "../schemas/contact";

const router = express.Router();

router.post(
  apiUrls.contact.create,
  validateSchema(Schema.createContact),
  contactController.Create
);

router.delete(
  apiUrls.contact.delete(":contactId"),
  requireAuth,
  validateSchema(Schema.deleteContact),
  contactController.Delete
);

export default router;
