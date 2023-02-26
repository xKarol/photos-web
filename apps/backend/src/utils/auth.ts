import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import type { VerifyFunction } from "passport-local";
import type { Express } from "express";
import session from "express-session";

const sessionConfig: session.SessionOptions = {
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 3 * 1000 },
};

type User = { username: string };

const initAuth = (app: Express) => {
  passport.use(new LocalStrategy((...args) => verifyAdmin(args)));

  passport.serializeUser(function (user, cb) {
    cb(null, (user as User).username);
  });

  passport.deserializeUser(function (user, cb) {
    return cb(null, (user as User).username);
  });

  app.use(passport.initialize());
  app.use(session(sessionConfig));
};

export default initAuth;

function verifyAdmin([username, password, done]: Parameters<VerifyFunction>) {
  if (
    process.env.ADMIN_LOGIN === username &&
    process.env.ADMIN_PASSWORD === password
  ) {
    return done(null, { username });
  }
  return done("Invalid credentials.", false);
}
