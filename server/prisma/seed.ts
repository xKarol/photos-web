import { faker } from "@faker-js/faker";
import axios from "axios";

import { cloudinaryConfig } from "../src/config/cloudinary";
import { prisma } from "../src/db";
import { uploadPhoto } from "../src/services/photos";

cloudinaryConfig();

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const PHOTOS_LIMIT = 25;

const seedPhoto = async () => {
  const { data: buffer } = await axios.get(
    `${faker.image.unsplash.image(1280, randomBetween(1280, 2560), "desert")}`,
    {
      responseType: "arraybuffer",
    }
  );

  const data = await uploadPhoto(buffer);

  return await prisma.photos.create({
    data: {
      ...data,
      alt: "desert",
    },
  });
};

const main = async () => {
  await prisma.photos.deleteMany({});
  await Promise.all(Array(PHOTOS_LIMIT).fill(seedPhoto()));
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
