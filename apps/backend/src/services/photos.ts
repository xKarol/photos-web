import prisma from "@app/prisma";
import type { Photo } from "@app/types";

import createError from "http-errors";

export const createPhoto: Photo.Services["create"] = async (data) => {
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

export const getPhoto: Photo.Services["findOne"] = async (photoId) => {
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

export const deletePhoto: Photo.Services["delete"] = async (photoId) => {
  try {
    const data = await prisma.photos.delete({
      where: { imageId: photoId },
    });
    return data;
  } catch {
    throw createError(404, "Photo not found.");
  }
};
