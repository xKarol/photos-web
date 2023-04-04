import type { NextFunction, Request, Response } from "express";
import passport from "passport";

export const Login = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate("local", (err: unknown) => {
      if (err) throw err;
      return res.sendStatus(200);
    })(req, res, next);
  } catch (e) {
    next(e);
  }
};

export const Logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.logOut((err: unknown) => {
      if (err) throw err;
      res.send(200);
    });
  } catch (e) {
    next(e);
  }
};
