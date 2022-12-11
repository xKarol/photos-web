import type { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import { prisma } from "../db";
import type {
  DeletePhotoSchema,
  GetPhotosSchema,
  GetPhotoSchema,
} from "../schemas/photos";
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

export const GetOne = async (
  req: Request<GetPhotoSchema["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { photoId } = req.params;

    const data = await prisma.image.findUnique({ where: { id: photoId } });
    if (!data) throw createError(404, "Photo not found.");

    return res.send(data);
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

    const photos = await prisma.image.findMany({
      ...pagination,
    });

    const hasMore = photos.length - 1 === limit;
    const nextPage = hasMore ? page + 1 : undefined;

    return res.send({ data: photos.slice(0, limit), nextPage, limit });
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
    const { photoId } = req.params;

    await prisma.image.delete({ where: { id: photoId } });

    return res.send(200);
  } catch (error) {
    next(error);
  }
};
