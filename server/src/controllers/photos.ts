import type { Image } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import { prisma } from "../db";
import type {
  DeletePhotoSchema,
  GetPhotosSchema,
  GetPhotoSchema,
} from "../schemas/photos";
import { deleteCloudinaryImageById, uploadPhoto } from "../services/cloudinary";
import { paginationParams, getPaginationNextPage } from "../utils/misc";

type CreatePhotoBody = {
  image?: Express.Multer.File;
  alt?: string;
};

export const Create = async (
  req: Request<any, any, CreatePhotoBody>,
  res: Response<Image>,
  next: NextFunction
) => {
  try {
    const file = req.file;
    const body = req.body;
    if (!file?.buffer) throw new Error("Image is required.");

    const { buffer: photoBuffer } = file;

    const data = await uploadPhoto(photoBuffer);

    const newPhoto = await prisma.photos.create({
      data: {
        image: {
          create: {
            ...data,
            alt: body.alt,
          },
        },
      },
      include: { image: true },
    });

    return res.send(newPhoto.image);
  } catch (error) {
    next(error);
  }
};

export const GetOne = async (
  req: Request<GetPhotoSchema["params"]>,
  res: Response<Image>,
  next: NextFunction
) => {
  try {
    const { photoId } = req.params;

    const data = await prisma.photos.findUnique({
      where: { imageId: photoId },
      include: { image: true },
    });
    if (!data) throw createError(404, "Photo not found.");

    return res.send(data.image);
  } catch (error) {
    next(error);
  }
};

export const Get = async (
  req: Request<any, any, any, GetPhotosSchema["query"]>,
  res: Response<{
    data: Image[];
    nextPage: number | undefined;
    limit: number;
  }>,
  next: NextFunction
) => {
  try {
    const { page, limit, ...pagination } = paginationParams(req.query);

    const photos = await prisma.photos.findMany({
      ...pagination,
      include: { image: true },
    });

    const data = photos.map(({ image }) => image);

    const nextPage = getPaginationNextPage(photos, limit, page);
    return res.send({ data: data.slice(0, limit), nextPage, limit });
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

    await deleteCloudinaryImageById(photoId);
    await prisma.photos.delete({ where: { imageId: photoId } });

    return res.send(200);
  } catch (error) {
    next(error);
  }
};
