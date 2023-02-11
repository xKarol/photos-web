import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import type { VerifyFunction } from "passport-local";
import type { Express } from "express";
import session from "express-session";
import crypto from "node:crypto";

const sessionConfig = {
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 3 * 1000 },
  genid: () => crypto.randomUUID(),
};

const initAuth = (app: Express) => {
  app.use(passport.initialize());
  app.use(session(sessionConfig));
  passport.use(new LocalStrategy((...args) => verifyAdmin(args)));

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
};

export default initAuth;

function verifyAdmin([username, password, done]: Parameters<VerifyFunction>) {
  if (
    process.env.ADMIN_LOGIN === username &&
    process.env.ADMIN_PASSWORD === password
  ) {
    return done(null, { id: crypto.randomUUID() });
  }
  return done("Invalid credentials.", false);
}
