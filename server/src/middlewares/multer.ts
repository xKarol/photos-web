import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  fileFilter: async function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
  storage,
});

export { upload };
