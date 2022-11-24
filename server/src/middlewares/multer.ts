import multer from "multer";

import { getFileExtension } from "../utils/file";

const storage = multer.memoryStorage();

const allowedExtensions = ["jpg", "jpeg", "png"];
const maxSize = 1024 * 1024 * 5; // 5mb

const upload = multer({
  fileFilter: async function (req, file, cb) {
    const extension = getFileExtension(file.originalname) || "";
    if (!allowedExtensions.includes(extension)) {
      return cb(
        new Error(
          `Invalid file extension. Received: ${extension}
           Expected: ${allowedExtensions.join(", ")}`
        )
      );
    }
    cb(null, true);
  },
  limits: { fileSize: maxSize },
  storage,
});

export { upload };
