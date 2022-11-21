import { faker } from "@faker-js/faker";

import { prisma } from "../src/db";

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const PHOTOS_LIMIT = 25;

const seedPhoto = async () => {
  const data = () => ({
    src: `${faker.image.unsplash.image(
      640,
      randomBetween(640, 1280),
      "desert"
    )}?random=${Date.now()}`,
  });

  const photos = [];
  for (let i = 0; i < PHOTOS_LIMIT; i++) photos.push(data());
  await prisma.photos.createMany({
    data: photos,
  });
};

const main = async () => {
  await prisma.photos.deleteMany({});
  await seedPhoto();
};

main();
