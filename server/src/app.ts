import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { corsConfig } from "./config/cors";
import { errorHandler } from "./middlewares/error-handler";
import routes from "./routes";
import logger, { stream } from "./utils/logger";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan("dev", { stream }));
app.use(express.json());
app.use(routes);

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info(`App is running on http://localhost:${port}`);
  });
}

export default app;
