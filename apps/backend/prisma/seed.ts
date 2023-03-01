import { faker } from "@faker-js/faker";
import ora from "ora";
import { program } from "commander";
import { cloudinaryConfig } from "../src/config/cloudinary";
import { prisma } from "../src/lib/prisma";
import {
  deleteAllCloudinaryImages,
  getCloudinaryImages,
  uploadPhoto,
} from "../src/services/cloudinary";
import {
  randomBetween,
  getFakePhotoData,
  getFakePortfolioData,
  getRandomPortfolioPhotos,
  getRandomPhoto,
} from "./seed.utils";
import { createPhoto } from "../src/services/photos";
import { createPortfolio } from "../src/services/portfolios";
import type { ResourceType } from "../src/services/cloudinary";

program.option("--clear");
program.parse();
const options = program.opts();

cloudinaryConfig();

const MAX_MAIN_PHOTOS = 25;
const MAX_IMAGES = 50;
let cloudinaryImages: ResourceType[] = [];

const main = async () => {
  if (!options?.clear) cloudinaryImages = await getCloudinaryImages();

  const steps: Record<string, () => Promise<unknown>> = {
    ...(options?.clear && {
      "Removing images from cloud": deleteAllCloudinaryImages,
    }),
    "Deleting all records": deleteAllRecords,
    "Seeding main photos": seedMainPhotos,
    "Seeding images": seedImages,
    "Seeding portfolios": seedPortfolios,
  };

  for await (const [key, value] of Object.entries(steps)) {
    const spinner = ora(key).start();
    try {
      await value();
      spinner.succeed(key);
    } catch (e) {
      spinner.fail(e instanceof Error ? e.message : "Unknown error");
      throw e;
    }
  }
};

main()
  .then(async () => {
    return await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    throw e;
  });

async function deleteAllRecords() {
  await prisma.photos.deleteMany({});
  await prisma.image.deleteMany({});
  await prisma.portfolios.deleteMany({});
}

async function seedMainPhotos() {
  const photos = await Promise.all(
    Array.from({ length: MAX_MAIN_PHOTOS }, async () => {
      const data = await getRandomCloudinaryImage(cloudinaryImages);
      const photo = await createPhoto({
        ...data,
        ...getFakePhotoData(),
      });
      return photo;
    })
  );
  return photos;
}

async function seedImages() {
  const images = await Promise.all(
    Array.from({ length: MAX_IMAGES }, async () => {
      const data = await getRandomCloudinaryImage(cloudinaryImages);

      const photo = await prisma.image.create({
        data: {
          ...data,
          ...getFakePhotoData(),
        },
      });
      return photo;
    })
  );
  return images;
}

async function seedPortfolios() {
  const photos = await prisma.image.findMany({});
  const MAX_PORTFOLIOS = randomBetween(4, 8);
  const uniqueNames = faker.helpers.uniqueArray(
    () => faker.lorem.words(randomBetween(1, 2)),
    MAX_PORTFOLIOS
  );
  await Promise.all(
    Array.from({ length: MAX_PORTFOLIOS }, async (_, index) => {
      const { name, slug } = getFakePortfolioData(uniqueNames[index]);
      const portfolio = await createPortfolio({
        images: getRandomPortfolioPhotos(photos),
        name,
        slug,
      });
      return portfolio;
    })
  );
}

async function getRandomCloudinaryImage(cloudinaryImages: ResourceType[] = []) {
  if (cloudinaryImages.length > 0) {
    const randomIndex = Math.floor(Math.random() * cloudinaryImages.length);
    const {
      asset_id,
      url,
      width,
      height,
      format: mimeType,
    } = cloudinaryImages.splice(randomIndex, 1)[0];

    return {
      id: asset_id,
      src: url,
      width,
      height,
      mimeType,
    };
  }

  const randomBuffer = await getRandomPhoto();
  const data = await uploadPhoto(randomBuffer);
  return data;
}
