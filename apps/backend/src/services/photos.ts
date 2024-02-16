import prisma from "@app/prisma";
import type { Photo } from "@app/types";

import { getPaginationData } from "../utils/misc";

export const createPhoto: Photo.Services["create"] = async (data) => {
  const res = await prisma.photos.create({
    data: {
      image: {
        create: data,
      },
    },
    include: { image: true },
  });
  return res.image;
};

export const getPhoto: Photo.Services["findOne"] = async (photoId) => {
  const data = await prisma.photos.findUniqueOrThrow({
    where: { imageId: photoId },
    include: { image: true },
  });
  return data.image;
};

export const getPhotos: Photo.Services["findAll"] = async (params) => {
  const { skip, limit, page } = params;
  const response = await prisma.photos.findMany({
    skip: skip,
    take: limit + 1,
    include: {
      image: true,
    },
  });

  const data = response.map((data) => data.image);

  return getPaginationData(data, { page, limit });
};

export const deletePhoto: Photo.Services["delete"] = async (photoId) => {
  const data = await prisma.photos.delete({
    where: { imageId: photoId },
  });
  return data;
};
