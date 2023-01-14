import express from "express";

import * as contactController from "../controllers/contact";
import { validateSchema } from "../middlewares/validate-schema";
import { contactCreateSchema, contactDeleteSchema } from "../schemas/contact";

const router = express.Router();

router.post(
  "/contact",
  validateSchema(contactCreateSchema),
  contactController.Create
);

router.delete(
  "/contact/:contactId",
  validateSchema(contactDeleteSchema),
  contactController.Delete
);

export default router;
