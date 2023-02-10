import type { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import type { API } from "types";
import { deleteImage, getImage, uploadImage } from "../services/about";
import { deleteCloudinaryImageById, uploadPhoto } from "../services/cloudinary";

type CreatePhotoBody = {
  image?: Express.Multer.File;
  alt: string;
};

export const UploadImage = async (
  req: Request<unknown, unknown, CreatePhotoBody>,
  res: Response<API["About"]["Upload"]>,
  next: NextFunction
) => {
  try {
    const file = req.file;
    const { alt } = req.body;
    if (!file?.buffer) throw createError(400, "Image is required.");
    const { buffer } = file;

    const image = await getImage().catch(() => null);

    if (image) {
      await deleteCloudinaryImageById(image.id);
      await deleteImage(image.id);
    }

    const data = await uploadPhoto(buffer);
    const photo = await uploadImage({ ...data, alt });
    return res.send(photo);
  } catch (error) {
    next(error);
  }
};

export const GetImage = async (
  req: Request,
  res: Response<API["About"]["Get"]>,
  next: NextFunction
) => {
  try {
    const photo = await getImage();
    return res.send(photo);
  } catch (error) {
    next(error);
  }
};
