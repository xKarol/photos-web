import express from "express";
import { cloudinaryConfig } from "../config/cloudinary";
import * as imageController from "../controllers/image";
import { validateSchema } from "../middlewares/validate-schema";
import { getImageSchema, getImagePlaceholderSchema } from "../schemas/images";

const router = express.Router();

cloudinaryConfig();

router.get(
  "/images/:id",
  validateSchema(getImageSchema),
  imageController.GetOne
);

router.get(
  "/images/:id/placeholder",
  validateSchema(getImagePlaceholderSchema),
  imageController.GetPlaceholder
);

export default router;
