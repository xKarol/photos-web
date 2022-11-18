import express from "express";

import notFoundRoutes from "./404";
import newsletterRoutes from "./newsletter";

const router = express.Router();

router.use(newsletterRoutes);
router.use(notFoundRoutes);

export default router;
