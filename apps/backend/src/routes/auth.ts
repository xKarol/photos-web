import express from "express";
import * as auth from "../controllers/auth";

const router = express.Router();

router.post("/admin/login", auth.Login);

router.post("/admin/logout", auth.Logout);

export default router;
