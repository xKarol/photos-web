import { apiUrls } from "@app/config";

import express from "express";

import { cloudinaryConfig } from "../config/cloudinary";
import * as photosController from "../controllers/photos";
import { upload } from "../middlewares/multer";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";
import { withPagination } from "../middlewares/with-pagination";
import {
  deletePhotoSchema,
  getPhotoSchema,
  getPhotosSchema,
} from "../schemas/photos";

const router = express.Router();

cloudinaryConfig();

router.post(
  apiUrls.photo.create,
  requireAuth,
  upload.single("image"),
  photosController.Create
);

router.get(
  apiUrls.photo.findOne(":photoId"),
  validateSchema(getPhotoSchema),
  photosController.GetOne
);

router.get(
  apiUrls.photo.findAll,
  validateSchema(getPhotosSchema),
  withPagination,
  photosController.Get
);

router.delete(
  apiUrls.photo.delete(":photoId"),
  requireAuth,
  validateSchema(deletePhotoSchema),
  photosController.Delete
);

export default router;
