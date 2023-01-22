import express from "express";
import * as auth from "../controllers/auth";

const router = express.Router();

router.post("/admin/login", auth.Login);

router.post("/admin/logout", (req, res) => {
  req.logOut((err) => {
    if (err) throw err;
    res.send(200);
  });
});

export default router;
