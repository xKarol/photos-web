import prisma from "@app/prisma";
import type { Image } from "@app/types";

import type { NextFunction, Request, Response } from "express";
import mime from "mime-types";

import cache from "../lib/cache";
import type * as Schema from "../schemas/images";
import { getBufferFromUrl } from "../utils/misc";

type CacheType = {
  buffer: Buffer;
  mimeType: string;
};

export const GetOne = async (
  req: Request<Schema.GetImageSchema["params"]>,
  res: Response<Awaited<ReturnType<Image.Api["findOne"]>>>,
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
