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
    `${faker.image.nature(1280, randomBetween(1280, 2560))}`,
    {
      responseType: "arraybuffer",
    }
  );

  const data = await uploadPhoto(buffer);

  const photo = await prisma.photos.create({
    data: {
      ...data,
      alt: "desert",
    },
  });
  return photo;
};

const main = async () => {
  console.time("Seed");
  await prisma.photos.deleteMany({});
  const photos = Array(PHOTOS_LIMIT).fill(null);
  for (const index of photos.keys()) {
    console.log(`Seeding photos [${index + 1}/${PHOTOS_LIMIT}]`);
    await seedPhoto();
  }
  console.timeEnd("Seed");
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
