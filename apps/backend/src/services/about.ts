import { ImageType } from "@prisma/client";
import createError from "http-errors";
import { deleteCloudinaryImageById, uploadPhoto } from "./cloudinary";
import { prisma } from "../db";

export const uploadImage = async (buffer: Buffer, alt: string) => {
  const data = await uploadPhoto(buffer);

  const photo = await prisma.image.create({
    data: {
      ...data,
      alt: alt,
      type: ImageType.ABOUT,
    },
  });
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
    await deleteCloudinaryImageById(imageId);
    await prisma.image.delete({ where: { id: imageId } });
  } catch {
    throw createError(404, "An error occurred while deleting the image.");
  }
};
