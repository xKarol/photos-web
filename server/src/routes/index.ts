import express from "express";

import notFoundRoutes from "./404";
import contactRoutes from "./contact";
import aboutRoutes from "./about";
import newsletterRoutes from "./newsletter";
import photoRoutes from "./photos";
import portfoliosRoutes from "./portfolios";

const router = express.Router();

router.use(photoRoutes);
router.use(portfoliosRoutes);
router.use(aboutRoutes);
router.use(newsletterRoutes);
router.use(contactRoutes);
router.use(notFoundRoutes);

export default router;
