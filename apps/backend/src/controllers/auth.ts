import type { NextFunction, Request, Response } from "express";
import passport from "passport";

export const Login = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate("local", (err) => {
      if (err) throw err;
      return res.send(200);
    })(req, res, next);
  } catch (e) {
    next(e);
  }
};

export const Logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.logOut((err) => {
      if (err) throw err;
      res.send(200);
    });
  } catch (e) {
    next(e);
  }
};
