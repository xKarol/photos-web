import type { NextFunction, Request, Response } from "express";
import mime from "mime-types";
import type { API } from "types";
import { prisma } from "../lib/prisma";
import { GetImageSchema } from "../schemas/images";
import { getBufferFromUrl } from "../utils/misc";

export const GetOne = async (
  req: Request<GetImageSchema["params"]>,
  res: Response<API["Image"]["GetOne"]>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const image = await prisma.image.findUniqueOrThrow({ where: { id: id } });
    const buffer = await getBufferFromUrl(image.src);
    const mimeType = mime.lookup(image.mimeType) || "image/webp";
    res.set("Content-Type", mimeType);
    return res.send(buffer);
  } catch (error) {
    next(error);
  }
};
