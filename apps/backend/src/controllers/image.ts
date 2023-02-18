import { v2 as cloudinary } from "cloudinary";
import type { NextFunction, Request, Response } from "express";
import mime from "mime-types";
import type { API } from "types";
import { prisma } from "../lib/prisma";
import type * as Schema from "../schemas/images";
import { getBufferFromUrl } from "../utils/misc";
import cache from "../lib/cache";
import { getImageByIds } from "../services/cloudinary";

type CacheType = {
  buffer: Buffer;
  mimeType: string;
};

export const GetOne = async (
  req: Request<Schema.GetImageSchema["params"]>,
  res: Response<API["Image"]["GetOne"]>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const cachedImage = cache.get(id);

    if (cachedImage) {
      const { buffer, mimeType } = cachedImage as CacheType;
      res.set("Content-Type", mimeType);
      return res.send(buffer);
    }

    const image = await prisma.image.findUniqueOrThrow({
      where: { id: id },
      select: { src: true, mimeType: true },
    });
    const buffer = await getBufferFromUrl(image.src);
    const mimeType = mime.lookup(image.mimeType) || "image/webp";
    cache.set<CacheType>(id, { buffer, mimeType }, 60 * 60); //1 hour cache
    res.set("Content-Type", mimeType);
    return res.send(buffer);
  } catch (error) {
    next(error);
  }
};

export const GetPlaceholder = async (
  req: Request<
    Schema.GetImagePlaceholderSchema["params"],
    unknown,
    unknown,
    Schema.GetImagePlaceholderSchema["query"]
  >,
  res: Response<API["Image"]["GetPlaceholder"]>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { width = "300", height = "300" } = req.query;

    const cacheKey = `placeholder_${id}${JSON.stringify({ width, height })}`;
    const cachedImage = cache.get(cacheKey);

    if (cachedImage) {
      const { buffer, mimeType } = cachedImage as CacheType;
      res.set("Content-Type", mimeType);
      return res.send(buffer);
    }

    const image = await prisma.image.findUniqueOrThrow({
      where: { id: id },
      select: { id: true, mimeType: true },
    });

    const [cloudinaryImg] = await getImageByIds([image.id], {
      width,
      height,
    });

    const url = cloudinary.url(cloudinaryImg.public_id, {
      transformation: [
        { effect: "blur:1000" },
        { width, height, crop: "fill" },
      ],
    });

    const buffer = await getBufferFromUrl(url);
    const mimeType = mime.lookup(image.mimeType) || "image/webp";
    cache.set<CacheType>(
      cacheKey,
      { buffer, mimeType },
      60 * 60 //1 hour cache
    );
    res.set("Content-Type", mimeType);
    return res.send(buffer);
  } catch (error) {
    next(error);
  }
};
