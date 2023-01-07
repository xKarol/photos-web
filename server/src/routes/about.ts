import express from "express";

import { cloudinaryConfig } from "../config/cloudinary";
import * as aboutController from "../controllers/about";
import { upload } from "../middlewares/multer";

const router = express.Router();

cloudinaryConfig();

router.put("/about/image", upload.single("image"), aboutController.UploadImage);
router.get("/about/image", aboutController.GetImage);

export default router;
