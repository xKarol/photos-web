import express from "express";
import { cloudinaryConfig } from "../config/cloudinary";
import * as photosController from "../controllers/photos";
import { upload } from "../middlewares/multer";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";
import {
  deletePhotoSchema,
  getPhotoSchema,
  getPhotosSchema,
} from "../schemas/photos";

const router = express.Router();

cloudinaryConfig();

router.post(
  "/photos",
  requireAuth,
  upload.single("image"),
  photosController.Create
);

router.get(
  "/photos/:photoId",
  validateSchema(getPhotoSchema),
  photosController.GetOne
);

router.get("/photos", validateSchema(getPhotosSchema), photosController.Get);

router.delete(
  "/photos/:photoId",
  requireAuth,
  validateSchema(deletePhotoSchema),
  photosController.Delete
);

export default router;
