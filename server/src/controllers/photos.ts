import type { NextFunction, Request, Response } from "express";
import queryString from "query-string";

import { DeletePhotoSchema, GetPhotosSchema } from "../schemas/photos";

export const Get = async (
  req: Request<any, any, any, GetPhotosSchema["query"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.query;
    const query: GetPhotosSchema["query"] = queryString.parse(
      queryString.stringify(data),
      {
        parseNumbers: true,
      }
    );
    return res.send(query);
  } catch (error) {
    next(error);
  }
};

export const Delete = async (
  req: Request<DeletePhotoSchema["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.params;

    return res.send(data);
  } catch (error) {
    next(error);
  }
};
