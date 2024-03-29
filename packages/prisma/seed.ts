/* eslint-disable no-console */

/* eslint-disable unicorn/no-process-exit */
import { cloudinaryConfig } from "../../apps/backend/src/config/cloudinary";
import {
  deleteAllCloudinaryImages,
  getCloudinaryImages,
  uploadPhoto,
} from "../../apps/backend/src/services/cloudinary";
import type { ResourceType } from "../../apps/backend/src/services/cloudinary";
import { createPhoto } from "../../apps/backend/src/services/photos";
import { createPortfolio } from "../../apps/backend/src/services/portfolios";
import {
  getPlaceholderString,
  getPlaceholderURL,
} from "../../apps/backend/src/utils/buffer";
import { getBufferFromUrl } from "../../apps/backend/src/utils/misc";
import prisma from "./";
import {
  getFakePhotoData,
  getFakePortfolioData,
  getRandomPhoto,
  measureTime,
  randomBetween,
} from "./seed.utils";
import { faker } from "@faker-js/faker";
import { program } from "commander";
import ora from "ora";

program.option("--clear");
program.parse();
const options = program.opts();

cloudinaryConfig();

let cloudinaryImages: ResourceType[] = [];

const main = async () => {
  const globalTime = measureTime();

  if (!options?.clear) cloudinaryImages = await getCloudinaryImages();

  const steps: Record<string, () => Promise<unknown>> = {
    ...(options?.clear && {
      "Removing images from cloud": deleteAllCloudinaryImages,
    }),
    "Clearing Database": deleteAllRecords,
    "Seeding photos": seedMainPhotos,
    "Seeding portfolios": seedPortfolios,
  };

  console.log(""); //one line space;

  for await (const [key, value] of Object.entries(steps)) {
    const spinner = ora(key).start();
    try {
      const time = measureTime();
      await value();
      spinner.succeed(`${key} (${time.end()}s)`);
    } catch (e) {
      spinner.fail(e instanceof Error ? e.message : "Unknown error");
      throw e;
    }
  }
  console.log(""); //one line space;
  ora(`The database has been seeded in ${globalTime.end()}s.`).succeed();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function deleteAllRecords() {
  await prisma.$transaction([
    prisma.photos.deleteMany({}),
    prisma.image.deleteMany({}),
    prisma.portfolios.deleteMany({}),
  ]);
}

async function seedMainPhotos() {
  const photos = await Promise.all(
    Array.from({ length: randomBetween(20, 25) }, async () => {
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

async function seedImages(length: number) {
  const images = await Promise.all(
    Array.from({ length }, async () => {
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
  const MAX_PORTFOLIOS = randomBetween(4, 8);
  const uniqueNames = faker.helpers.uniqueArray(
    () => faker.lorem.words(randomBetween(1, 2)),
    MAX_PORTFOLIOS
  );
  await Promise.all(
    Array.from({ length: MAX_PORTFOLIOS }, async (_, index) => {
      const { name, slug } = getFakePortfolioData(uniqueNames[index]);
      const photos = await seedImages(randomBetween(5, 10));
      const portfolio = await createPortfolio({
        images: photos.map(({ id }) => id),
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
      public_id,
      url,
      width,
      height,
      format: mimeType,
    } = cloudinaryImages.splice(randomIndex, 1)[0];
    const placeholderUrl = getPlaceholderURL(public_id);
    const placeholderBuffer = await getBufferFromUrl(placeholderUrl);
    const placeholder = getPlaceholderString(placeholderBuffer);

    return {
      id: asset_id,
      src: url,
      width,
      height,
      mimeType,
      placeholder,
    };
  }

  const randomBuffer = await getRandomPhoto();
  const data = await uploadPhoto(randomBuffer);
  return data;
}
