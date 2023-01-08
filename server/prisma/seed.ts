import { Image, ImageType } from "@prisma/client";

import { cloudinaryConfig } from "../src/config/cloudinary";
import { prisma } from "../src/db";
import { uploadPhoto } from "../src/services/cloudinary";

import {
  randomBetween,
  createPhoto,
  createPortfolioPhotos,
  getRandomPortfolioPhotos,
  getRandomPhoto,
  getRandomPeoplePhoto,
} from "./seed.utils";

cloudinaryConfig();

const MAX_MAIN_PHOTOS = 25;
const MAX_IMAGES = 100;

const main = async () => {
  const images = await seedImages();
  const photos = await seedMainPhotos();
  await seedAboutPhoto();
  images.push(...photos.map(({ image }) => image));
  await seedPortfolios(images);
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

async function seedMainPhotos() {
  await prisma.photos.deleteMany({});
  console.time("Created main photos in");
  const photos = await Promise.all(
    Array.from({ length: MAX_MAIN_PHOTOS }, async () => {
      const randomPhotoBuffer = await getRandomPhoto();
      const data = await uploadPhoto(randomPhotoBuffer);

      const photo = await prisma.photos.create({
        data: {
          image: {
            create: {
              id: data.public_id,
              placeholder: data.placeholder,
              ...createPhoto(),
            },
          },
        },
        include: { image: true },
      });
      return photo;
    })
  );
  console.timeEnd("Created main photos in");
  return photos;
}

async function seedAboutPhoto() {
  await prisma.image.deleteMany({ where: { type: "ABOUT" } });
  console.time("Created about photo in");
  const randomPhotoBuffer = await getRandomPeoplePhoto();
  const data = await uploadPhoto(randomPhotoBuffer);

  await prisma.image.create({
    data: {
      id: data.public_id,
      placeholder: data.placeholder,
      ...createPhoto(),
      type: ImageType.ABOUT,
    },
  });
  console.timeEnd("Created about photo in");
}

async function seedImages() {
  await prisma.image.deleteMany({});
  console.time("Created images in");
  const images = await Promise.all(
    Array.from({ length: MAX_IMAGES }, async () => {
      const randomPhotoBuffer = await getRandomPhoto();
      const data = await uploadPhoto(randomPhotoBuffer);

      const photo = await prisma.image.create({
        data: {
          id: data.public_id,
          placeholder: data.placeholder,
          ...createPhoto(),
        },
      });
      return photo;
    })
  );
  console.timeEnd("Created images in");
  return images;
}

async function seedPortfolios(photos: Image[]) {
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
}
