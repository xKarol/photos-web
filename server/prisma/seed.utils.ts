import { faker } from "@faker-js/faker";
import { type Image, PortfolioPhotos } from "@prisma/client";
import axios from "axios";

import type { uploadPhoto } from "../src/services/photos";

export const createPhoto = (
  photoData: Awaited<ReturnType<typeof uploadPhoto>>
): Omit<Image, "id" | "createdAt" | "updatedAt" | "type"> => {
  return {
    alt: faker.lorem.words(2),
    ...photoData,
  };
};

export const createPortfolioPhotos = (): Omit<
  PortfolioPhotos,
  "id" | "createdAt" | "updatedAt"
> => {
  return {
    name: faker.lorem.words(randomBetween(1, 2)),
  };
};

const randomArrayItem = <T>(items: T[]) => {
  return items[Math.floor(Math.random() * items.length)];
};

export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandomPortfolioPhotos = (
  photos: Image[]
): Record<"id", string>[] => {
  const itemsInPortfolio = randomBetween(5, 30);
  const randomPhotos = Array.from({ length: itemsInPortfolio }, () =>
    randomArrayItem(photos)
  );
  return randomPhotos.map((photo) => ({ id: photo.id }));
};

export const getBufferFromUrl = async (url: string) => {
  const { data: buffer } = await axios.get(url, {
    responseType: "arraybuffer",
  });
  return buffer;
};

export async function getRandomPhoto() {
  const buffer = await getBufferFromUrl(
    faker.image.nature(1280, randomBetween(1280, 2560))
  );
  return buffer;
}

export async function getRandomPeoplePhoto() {
  const buffer = await getBufferFromUrl(faker.image.people(640, 1280));
  return buffer;
}
