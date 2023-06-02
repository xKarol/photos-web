import express from "express";
import passport from "passport";

import * as auth from "../controllers/auth";

const router = express.Router();

// router.post("/admin/login", auth.Login);

router.post("/admin/login", passport.authenticate("local", {}), (req, res) => {
  res.sendStatus(200);
});

router.post("/admin/logout", auth.Logout);

export default router;
