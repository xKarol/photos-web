import type { Photo } from "@app/types";

import type { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import { apicache } from "../lib/cache-manager";
import type {
  DeletePhotoSchema,
  GetPhotoSchema,
  GetPhotosSchema,
} from "../schemas/photos";
import { deleteCloudinaryImageById, uploadPhoto } from "../services/cloudinary";
import {
  createPhoto,
  deletePhoto,
  getPhoto,
  getPhotos,
} from "../services/photos";

type CreatePhotoBody = {
  image?: Express.Multer.File;
  alt: string;
};

export const Create = async (
  req: Request<unknown, unknown, CreatePhotoBody>,
  res: Response<Photo.ApiResponse["create"]>,
  next: NextFunction
) => {
  try {
    const file = req.file;
    const body = req.body;
    if (!file?.buffer) throw createError(400, "Image is required.");
    const { buffer: photoBuffer } = file;

    const data = await uploadPhoto(photoBuffer, "photos");
    const newPhoto = await createPhoto({ ...data, alt: body.alt });

    return res.send(newPhoto);
  } catch (error) {
    next(error);
  }
};

export const GetOne = async (
  req: Request<GetPhotoSchema["params"]>,
  res: Response<Photo.ApiResponse["findOne"]>,
  next: NextFunction
) => {
  try {
    const { photoId } = req.params;
    const data = await getPhoto(photoId);
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

export const Get = async (
  req: Request<unknown, unknown, unknown, GetPhotosSchema["query"]>,
  res: Response<Photo.ApiResponse["findAll"]>,
  next: NextFunction
) => {
  try {
    const paginationParams = req.pagination;

    const data = await getPhotos({
      ...paginationParams,
    });

    return res.send(data);
  } catch (error) {
    next(error);
  }
};

export const Delete = async (
  req: Request<DeletePhotoSchema["params"]>,
  res: Response<Photo.ApiResponse["delete"]>,
  next: NextFunction
) => {
  try {
    const { photoId } = req.params;

    await deleteCloudinaryImageById(photoId);
    await deletePhoto(photoId);

    apicache.clear("");

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
