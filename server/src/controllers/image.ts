import type { NextFunction, Request, Response } from "express";
import mime from "mime-types";

import { GetImageSchema } from "../schemas/images";
import { getImageById } from "../services/cloudinary";
import { getBufferFromUrl } from "../utils/misc";

export const GetOne = async (
  req: Request<GetImageSchema["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const image = await getImageById(id);
    const buffer = await getBufferFromUrl(image.url);
    const mimeType = mime.lookup(image.format) || "image/webp";
    res.set("Content-Type", mimeType);
    return res.send(buffer);
  } catch (error) {
    next(error);
  }
};
