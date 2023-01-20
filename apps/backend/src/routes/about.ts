import express from "express";

import { cloudinaryConfig } from "../config/cloudinary";
import * as aboutController from "../controllers/about";
import { upload } from "../middlewares/multer";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

cloudinaryConfig();

router.put(
  "/about/image",
  requireAuth,
  upload.single("image"),
  aboutController.UploadImage
);
router.get("/about/image", aboutController.GetImage);

export default router;
