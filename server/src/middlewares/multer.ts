import multer from "multer";

import path from "path";
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
//

// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
//   destination: "uploads/",
// });

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
