import express from "express";

import notFoundRoutes from "./404";
import contactRoutes from "./contact";
import newsletterRoutes from "./newsletter";
import photoRoutes from "./photos";

const router = express.Router();

router.use(photoRoutes);
router.use(newsletterRoutes);
router.use(contactRoutes);
router.use(notFoundRoutes);

export default router;
