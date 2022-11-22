import { v2 as cloudinary } from "cloudinary";
import type { NextFunction, Request, Response } from "express";
import queryString from "query-string";
import sharp from "sharp";
import { Readable } from "readable-stream";

import { prisma } from "../db";
import type {
  CreatePhotoSchema,
  DeletePhotoSchema,
  GetPhotosSchema,
} from "../schemas/photos";

export const Create = async (
  req: Request<any, any, CreatePhotoSchema["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    if (!file?.buffer) throw new Error("Error occurred.");

    const data = await sharp(file?.buffer).webp({ quality: 20 }).toBuffer();
    const readable = (buffer: Buffer) =>
      new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        },
      });

    const stream = cloudinary.uploader.upload_stream(
      { folder: "photos" },
      (error, result) => {
        if (error) throw error;
        res.send({ src: result?.secure_url });
      }
    );
    readable(data).pipe(stream);
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
