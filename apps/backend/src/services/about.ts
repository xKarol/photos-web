import { ImageType } from "@prisma/client";
import type { Image } from "@prisma/client";
import createError from "http-errors";
import { prisma } from "../lib/prisma";

export const uploadImage = async (
  data: Omit<Image, "type" | "createdAt" | "updatedAt">
) => {
  try {
    const photo = await prisma.image.create({
      data: {
        ...data,
        type: ImageType.ABOUT,
      },
    });
    return photo;
  } catch {
    throw createError(400, "Could not create image.");
  }
};

export const getImage = async () => {
  try {
    const photo = await prisma.image.findFirstOrThrow({
      where: { type: ImageType.ABOUT },
    });
    return photo;
  } catch {
    throw createError(404, "Cannot find about image.");
  }
};

export const deleteImage = async (imageId: string) => {
  try {
    const response = await prisma.image.delete({ where: { id: imageId } });
    return response;
  } catch {
    throw createError(404, "An error occurred while deleting the image.");
  }
};
