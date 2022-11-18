import express from "express";

import notFoundRoutes from "./404";

const router = express.Router();

router.use(notFoundRoutes);

export default router;
