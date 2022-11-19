import express from "express";

import * as photosController from "../controllers/photos";
import { validateSchema } from "../middlewares/validate-schema";
import { deletePhotoSchema, getPhotosSchema } from "../schemas/photos";

const router = express.Router();

router.get("/photos", validateSchema(getPhotosSchema), photosController.Get);
router.delete(
  "/photos/:photoId",
  validateSchema(deletePhotoSchema),
  photosController.Delete
);

export default router;
