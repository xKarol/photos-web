import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { corsConfig } from "./config/cors";
import { errorHandler } from "./middlewares/error-handler";
import routes from "./routes";
import scheduledFunctions from "./utils/scheduled-functions";
import logger, { stream } from "./utils/logger";
import { transporterVerify } from "./utils/mailer";
import initAuth from "./utils/auth";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan("dev", { stream }));
app.use(express.json());

initAuth(app);

app.use(routes);

app.use(errorHandler);

scheduledFunctions.init();

if (process.env.NODE_ENV !== "test") {
  app.listen(port, async () => {
    await transporterVerify().catch(() => null);
    logger.info(`App is running on http://localhost:${port}`);
  });
}

export default app;
