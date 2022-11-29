import type { NextFunction, Request, Response } from "express";

import { prisma } from "../db";
import type { DeletePhotoSchema, GetPhotosSchema } from "../schemas/photos";
import { uploadPhoto } from "../services/photos";
import { paginationParams } from "../utils/pagination-params";

type CreatePhotoBody = {
  image?: Express.Multer.File;
  alt?: string;
};

export const Create = async (
  req: Request<any, any, CreatePhotoBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    const body = req.body;
    if (!file?.buffer) throw new Error("Image is required.");

    const { buffer: photoBuffer } = file;

    const data = await uploadPhoto(photoBuffer);

    const newPhoto = await prisma.image.create({
      data: {
        alt: body.alt,
        ...data,
        type: "DEFAULT",
      },
    });
    return res.send(newPhoto);
  } catch (error) {
    next(error);
  }
};

export const Get = async (
  req: Request<any, any, any, GetPhotosSchema["query"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, ...pagination } = paginationParams(req.query);

    const [photos, count] = await prisma.$transaction([
      prisma.image.findMany({
        ...pagination,
      }),
      prisma.image.count(),
    ]);

    const hasMore = page + 1 * limit < count || photos.length;
    const nextPage = hasMore ? page + 1 : -1;

    return res.send({ data: photos, nextPage, limit });
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
