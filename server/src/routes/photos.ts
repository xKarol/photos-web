import express from "express";

import * as photosController from "../controllers/photos";
import { validateSchema } from "../middlewares/validate-schema";
import {
  createPhotoSchema,
  deletePhotoSchema,
  getPhotosSchema,
} from "../schemas/photos";

const router = express.Router();

router.post(
  "/photos",
  validateSchema(createPhotoSchema),
  photosController.Create
);

router.get("/photos", validateSchema(getPhotosSchema), photosController.Get);

router.delete(
  "/photos/:photoId",
  validateSchema(deletePhotoSchema),
  photosController.Delete
);

export default router;
