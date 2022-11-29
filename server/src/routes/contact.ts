import express from "express";

import * as contactController from "../controllers/contact";
import { validateSchema } from "../middlewares/validate-schema";
import { contactCreateSchema } from "../schemas/contact";

const router = express.Router();

router.post(
  "/contact",
  validateSchema(contactCreateSchema),
  contactController.Create
);

export default router;
