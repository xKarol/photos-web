import { ImageType } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";

import { prisma } from "../db";
import { uploadPhoto } from "../services/cloudinary";

type CreatePhotoBody = {
  image?: Express.Multer.File;
  alt?: string;
};

export const UploadImage = async (
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

    const photo = await prisma.image.create({
      data: {
        ...data,
        alt: body.alt,
        type: ImageType.ABOUT,
      },
    });
    return res.send(photo);
  } catch (error) {
    next(error);
  }
};

export const GetImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const photo = await prisma.image.findFirstOrThrow({
      where: { type: ImageType.ABOUT },
    });
    return res.send(photo);
  } catch (error) {
    next(error);
  }
};
