import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import crypto from "node:crypto";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { corsConfig } from "./config/cors";
import { errorHandler } from "./middlewares/error-handler";
import routes from "./routes";
import scheduledFunctions from "./scheduled-functions";
import logger, { stream } from "./utils/logger";
import { transporterVerify } from "./utils/mailer";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan("dev", { stream }));
app.use(express.json());

app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 3 * 1000 },
    genid: () => crypto.randomUUID(),
  })
);
passport.use(
  new LocalStrategy(function (username, password, done) {
    if (
      process.env.ADMIN_LOGIN === username &&
      process.env.ADMIN_PASSWORD === password
    ) {
      return done(null, { id: crypto.randomUUID() });
    }
    return done("Invalid credentials.", false);
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log("serialize", user);

    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log("deserialize", user);
    return cb(null, user as { id: string });
  });
});

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
