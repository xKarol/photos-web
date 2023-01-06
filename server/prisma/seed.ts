import { faker } from "@faker-js/faker";

import { cloudinaryConfig } from "../src/config/cloudinary";
import { prisma } from "../src/db";
import { uploadPhoto } from "../src/services/photos";

import { randomBetween, getBufferFromUrl, createPhoto } from "./seed.utils";

cloudinaryConfig();

const MAX_PHOTOS = 25;

const getRandomPhoto = async () => {
  const buffer = await getBufferFromUrl(
    faker.image.nature(1280, randomBetween(1280, 2560))
  );
  return buffer;
};

const main = async () => {
  await prisma.image.deleteMany({});
  console.time("Created photos in");
  await Promise.all(
    Array.from({ length: MAX_PHOTOS }, async () => {
      const randomPhotoBuffer = await getRandomPhoto();
      const data = await uploadPhoto(randomPhotoBuffer);

      const photo = await prisma.image.create({
        data: {
          ...createPhoto(data),
        },
      });
      return photo;
    })
  );
  console.timeEnd("Created photos in");
};

main()
  .then(async () => {
    return await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
