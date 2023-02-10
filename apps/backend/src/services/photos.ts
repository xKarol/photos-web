import type { Image } from "@prisma/client";
import createError from "http-errors";
import { prisma } from "../db";

export const createPhoto = async (
  data: Omit<Image, "type" | "createdAt" | "updatedAt">
) => {
  const res = await prisma.photos.create({
    data: {
      image: {
        create: data,
      },
    },
    include: { image: true },
  });
  if (!res) throw createError(400, "Could not create photo.");
  return res.image;
};

export const getPhoto = async (photoId: string) => {
  const data = await prisma.photos.findUnique({
    where: { imageId: photoId },
    include: { image: true },
  });
  if (!data) throw createError(404, "Photo not found.");
  return data.image;
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
