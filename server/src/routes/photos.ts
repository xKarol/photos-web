import express from "express";

import { cloudinaryConfig } from "../config/cloudinary";
import * as photosController from "../controllers/photos";
import { upload } from "../middlewares/multer";
import { validateSchema } from "../middlewares/validate-schema";
import {
  createPhotoSchema,
  deletePhotoSchema,
  getPhotosSchema,
} from "../schemas/photos";

const router = express.Router();

cloudinaryConfig();

router.post(
  "/photos",
  // validateSchema(createPhotoSchema),
  upload.single("image"),
  photosController.Create
);

router.get("/photos", validateSchema(getPhotosSchema), photosController.Get);

router.delete(
  "/photos/:photoId",
  validateSchema(deletePhotoSchema),
  photosController.Delete
);

export default router;
