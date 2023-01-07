import { ImageType } from "@prisma/client";

import { cloudinaryConfig } from "../src/config/cloudinary";
import { prisma } from "../src/db";
import { uploadPhoto } from "../src/services/photos";

import {
  randomBetween,
  createPhoto,
  createPortfolioPhotos,
  getRandomPortfolioPhotos,
  getRandomPhoto,
  getRandomPeoplePhoto,
} from "./seed.utils";

cloudinaryConfig();

const MAX_PHOTOS = 25;

const main = async () => {
  await prisma.image.deleteMany({});
  console.time("Created photos in");
  const photos = await Promise.all(
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

  console.time("Created about photo in");
  const randomPhotoBuffer = await getRandomPeoplePhoto();
  const data = await uploadPhoto(randomPhotoBuffer);

  await prisma.image.create({
    data: {
      ...createPhoto(data),
      type: ImageType.ABOUT,
    },
  });
  console.timeEnd("Created about photo in");

  await prisma.portfolioPhotos.deleteMany({});
  const MAX_PORTFOLIOS = randomBetween(4, 8);
  console.time("Created portfolio images in");
  await Promise.all(
    Array.from({ length: MAX_PORTFOLIOS }, async () => {
      const portfolio = await prisma.portfolioPhotos.create({
        data: {
          ...createPortfolioPhotos(),
          images: { connect: [...getRandomPortfolioPhotos(photos)] },
        },
      });
      return portfolio;
    })
  );
  console.timeEnd("Created portfolio images in");
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
