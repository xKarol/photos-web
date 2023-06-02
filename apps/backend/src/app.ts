import "./config/env";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { corsConfig } from "./config/cors";
import { errorHandler } from "./middlewares/error-handler";
import routes from "./routes";
import initAuth from "./utils/auth";
import logger, { stream } from "./utils/logger";
import { transporterVerify } from "./utils/mailer";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan("dev", { stream }));
app.use(express.json());

initAuth(app);

app.use(routes);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, async () => {
    await transporterVerify().catch(() => null);
    logger.info(`App is running on http://localhost:${port}`);
  });
}

export default app;
