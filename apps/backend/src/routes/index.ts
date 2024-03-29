import express from "express";

import notFoundRoutes from "./404";
import authRoutes from "./auth";
import contactRoutes from "./contact";
import healthCheckRoute from "./health-check";
import imageRoutes from "./images";
import newsletterRoutes from "./newsletter";
import photoRoutes from "./photos";
import portfoliosRoutes from "./portfolios";

const router = express.Router();

router.use(healthCheckRoute);
router.use(authRoutes);
router.use(imageRoutes);
router.use(photoRoutes);
router.use(portfoliosRoutes);
router.use(newsletterRoutes);
router.use(contactRoutes);
router.use(notFoundRoutes);

export default router;
