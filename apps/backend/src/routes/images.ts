import { apiUrls } from "@app/config";

import express from "express";

import { cloudinaryConfig } from "../config/cloudinary";
import * as imageController from "../controllers/image";
import { validateSchema } from "../middlewares/validate-schema";
import { withCache } from "../middlewares/with-cache";
import { getImageSchema } from "../schemas/images";

const router = express.Router();

cloudinaryConfig();

router.get(
  apiUrls.image.findOne(":id"),
  validateSchema(getImageSchema),
  withCache("1 hour"),
  imageController.GetOne
);

export default router;
