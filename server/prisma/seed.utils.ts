import { faker } from "@faker-js/faker";
import type { Image } from "@prisma/client";
import axios from "axios";

import type { uploadPhoto } from "../src/services/photos";

export const createPhoto = (
  photoData: Awaited<ReturnType<typeof uploadPhoto>>
): Omit<Image, "id" | "createdAt" | "updatedAt"> => {
  return {
    alt: faker.lorem.words(2),
    type: "DEFAULT",
    ...photoData,
  };
};

export const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getBufferFromUrl = async (url: string) => {
  const { data: buffer } = await axios.get(url, {
    responseType: "arraybuffer",
  });
  return buffer;
};
