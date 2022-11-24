import type { NextFunction, Request, Response } from "express";
import queryString from "query-string";
import sharp from "sharp";

import { prisma } from "../db";
import type { DeletePhotoSchema, GetPhotosSchema } from "../schemas/photos";
import { uploadFromBuffer } from "../utils/upload";

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

    const sharpImg = await sharp(file?.buffer).webp({ quality: 20 }).toBuffer();

    const data = await uploadFromBuffer(sharpImg);
    const newPhoto = await prisma.photos.create({
      data: {
        src: data.secure_url,
        alt: body.alt,
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
