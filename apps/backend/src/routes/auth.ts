import express from "express";
import * as auth from "../controllers/auth";

const router = express.Router();

router.post("/admin/login", auth.Login);

// router.post("/admin/logout", (req, _res) => {
//   req.logOut({ keepSessionInfo: false });
// });

export default router;
