import prisma from "@app/prisma";
import type { Image } from "@app/types";

import type { NextFunction, Request, Response } from "express";
import mime from "mime-types";

import type * as Schema from "../schemas/images";
import { getBufferFromUrl } from "../utils/misc";

export const GetOne = async (
  req: Request<Schema.GetImageSchema["params"]>,
  res: Response<Image.ApiResponse["findOne"]>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const image = await prisma.image.findUniqueOrThrow({
      where: { id: id },
      select: { src: true, mimeType: true },
    });
    const buffer = await getBufferFromUrl(image.src);
    const mimeType = mime.lookup(image.mimeType) || "image/webp";
    res.set("Content-Type", mimeType);
    return res.send(buffer);
  } catch (error) {
    next(error);
  }
};
