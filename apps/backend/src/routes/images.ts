import { apiUrls } from "@app/config";

import express from "express";

import { cloudinaryConfig } from "../config/cloudinary";
import * as imageController from "../controllers/image";
import { validateSchema } from "../middlewares/validate-schema";
import { getImageSchema } from "../schemas/images";

const router = express.Router();

cloudinaryConfig();

router.get(
  apiUrls.image.findOne(":id"),
  validateSchema(getImageSchema),
  imageController.GetOne
);

export default router;
