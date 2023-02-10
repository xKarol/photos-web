import { ImageType } from "@prisma/client";
import type { Image } from "@prisma/client";
import createError from "http-errors";
import { prisma } from "../db";

export const uploadImage = async (
  data: Omit<Image, "type" | "createdAt" | "updatedAt">
) => {
  const photo = await prisma.image.create({
    data: {
      ...data,
      type: ImageType.ABOUT,
    },
  });
  if (!photo) throw createError(400, "Could not create image.");
  return photo;
};

export const getImage = async () => {
  const photo = await prisma.image.findFirst({
    where: { type: ImageType.ABOUT },
  });
  if (!photo) throw createError(404, "Cannot find about image.");
  return photo;
};

export const deleteImage = async (imageId: string) => {
  try {
    const response = await prisma.image.delete({ where: { id: imageId } });
    return response;
  } catch {
    throw createError(404, "An error occurred while deleting the image.");
  }
};
