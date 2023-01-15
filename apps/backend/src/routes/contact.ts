import express from "express";

import * as contactController from "../controllers/contact";
import { validateSchema } from "../middlewares/validate-schema";
import * as Schema from "../schemas/contact";

const router = express.Router();

router.post(
  "/contact",
  validateSchema(Schema.createContact),
  contactController.Create
);

router.delete(
  "/contact/:contactId",
  validateSchema(Schema.deleteContact),
  contactController.Delete
);

export default router;
