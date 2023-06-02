import type { Image } from "@prisma/client";
import createError from "http-errors";

import { prisma } from "../lib/prisma";

export const createPhoto = async (
  data: Omit<Image, "type" | "createdAt" | "updatedAt">
) => {
  try {
    const res = await prisma.photos.create({
      data: {
        image: {
          create: data,
        },
      },
      include: { image: true },
    });
    return res.image;
  } catch {
    throw createError(400, "Could not create photo.");
  }
};

export const getPhoto = async (photoId: string) => {
  try {
    const data = await prisma.photos.findUniqueOrThrow({
      where: { imageId: photoId },
      include: { image: true },
    });
    return data.image;
  } catch {
    throw createError(404, "Photo not found.");
  }
};

export const deletePhoto = async (photoId: string) => {
  try {
    const data = await prisma.photos.delete({
      where: { imageId: photoId },
    });
    return data;
  } catch {
    throw createError(404, "Photo not found.");
  }
};
