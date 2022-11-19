import express from "express";

import notFoundRoutes from "./404";
import newsletterRoutes from "./newsletter";
import photoRoutes from "./photos";

const router = express.Router();

router.use(photoRoutes);
router.use(newsletterRoutes);
router.use(notFoundRoutes);

export default router;
