import type { NextFunction, Request, Response } from "express";
import queryString from "query-string";

import { prisma } from "../db";
import { DeletePhotoSchema, GetPhotosSchema } from "../schemas/photos";

export const Get = async (
  req: Request<any, any, any, GetPhotosSchema["query"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const { page = 0, limit = 10 }: { limit?: number; page?: number } =
      queryString.parse(queryString.stringify(query), {
        parseNumbers: true,
      });

    const data = await prisma.photos.findMany({
      skip: page * limit,
      take: limit,
    });

    return res.send({ data, page, limit });
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
