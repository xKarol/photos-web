import express from "express";

import * as newsletterController from "../controllers/newsletter";

const router = express.Router();

router.post("/newsletter/subscribe", newsletterController.Subscribe);

export default router;
