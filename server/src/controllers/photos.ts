import { Image } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import { prisma } from "../db";
import type {
  DeletePhotoSchema,
  GetPhotosSchema,
  GetPhotoSchema,
} from "../schemas/photos";
import { getImageById, uploadPhoto } from "../services/cloudinary";
import { getPaginationNextPage } from "../utils/misc";
import { paginationParams } from "../utils/pagination-params";

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

    const { placeholder, public_id } = await uploadPhoto(photoBuffer);

    const newPhoto = await prisma.photos.create({
      data: {
        image: {
          create: {
            id: public_id,
            alt: body.alt,
            placeholder,
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
  res: Response<{ data: Image[]; nextPage: number | undefined; limit: number }>,
  next: NextFunction
) => {
  try {
    const { page, limit, ...pagination } = paginationParams(req.query);

    const photos = await prisma.photos.findMany({
      ...pagination,
      include: { image: true },
    });

    const data: (Image & { width: number; height: number })[] = [];
    for await (const photo of photos) {
      if (!photo.image) throw createError(404, "Cannot find image");

      const { width, height } = await getImageById(photo.image.id);
      data.push({ ...photo.image, width, height });
    }

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

    await prisma.photos.delete({ where: { imageId: photoId } });

    return res.send(200);
  } catch (error) {
    next(error);
  }
};
