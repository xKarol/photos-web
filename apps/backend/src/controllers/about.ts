import type { NextFunction, Request, Response } from "express";
import type { API } from "types";
import { deleteImage, getImage, uploadImage } from "../services/about";

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
    if (!file?.buffer) throw new Error("Image is required.");

    const { buffer: photoBuffer } = file;

    const image = await getImage().catch(() => null);
    if (image) await deleteImage(image.id);

    const photo = await uploadImage(photoBuffer, alt);
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
