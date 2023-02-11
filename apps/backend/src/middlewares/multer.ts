import multer from "multer";
import { multerConfig } from "../config/multer";

const upload = multer(multerConfig);

export { upload };
