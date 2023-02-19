import { faker } from "@faker-js/faker";
import { ImageType } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import ora from "ora";
import { program } from "commander";
import { cloudinaryConfig } from "../src/config/cloudinary";
import { prisma } from "../src/lib/prisma";
import { uploadPhoto } from "../src/services/cloudinary";
import {
  randomBetween,
  createPhoto,
  createPortfolio,
  getRandomPortfolioPhotos,
  getRandomPhoto,
  getRandomPeoplePhoto,
} from "./seed.utils";

program.option("--clear");
program.parse();
const options = program.opts();

type ResourceType = {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  url: string;
  secure_url: string;
};

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
    "Seeding about photos": seedAboutPhoto,
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
  // console.time("Created main photos in");
  const photos = await Promise.all(
    Array.from({ length: MAX_MAIN_PHOTOS }, async () => {
      const data = await getRandomImage("people");

      const photo = await prisma.photos.create({
        data: {
          image: {
            create: {
              ...data,
              ...createPhoto(),
            },
          },
        },
        include: { image: true },
      });

      return photo;
    })
  );
  // console.timeEnd("Created main photos in");
  return photos;
}

async function seedAboutPhoto() {
  // console.time("Created about photo in");
  const data = await getRandomImage("people");

  await prisma.image.create({
    data: {
      ...data,
      ...createPhoto(),
      type: ImageType.ABOUT,
    },
  });
  // console.timeEnd("Created about photo in");
}

async function seedImages() {
  // console.time("Created images in");
  const images = await Promise.all(
    Array.from({ length: MAX_IMAGES }, async () => {
      const data = await getRandomImage();

      const photo = await prisma.image.create({
        data: {
          ...data,
          ...createPhoto(),
        },
      });
      return photo;
    })
  );
  // console.timeEnd("Created images in");
  return images;
}

async function seedPortfolios() {
  const photos = await prisma.image.findMany({
    where: { type: ImageType.DEFAULT },
  });
  const MAX_PORTFOLIOS = randomBetween(4, 8);
  // console.time("Created portfolio images in");
  const uniqueNames = faker.helpers.uniqueArray(
    () => faker.lorem.words(randomBetween(1, 2)),
    MAX_PORTFOLIOS
  );
  await Promise.all(
    Array.from({ length: MAX_PORTFOLIOS }, async (_, index) => {
      const portfolio = await prisma.portfolios.create({
        data: {
          ...createPortfolio(uniqueNames[index]),
          images: { connect: [...getRandomPortfolioPhotos(photos)] },
        },
      });
      return portfolio;
    })
  );
  // console.timeEnd("Created portfolio images in");
}

async function deleteAllCloudinaryImages() {
  // console.time("Deleted all cloudinary images in");
  await cloudinary.api.delete_all_resources({ all: true });
  // console.timeEnd("Deleted all cloudinary images in");
}

async function getCloudinaryImages() {
  const data = await cloudinary.api.resources({
    all: true,
    max_results: 9999,
  });
  return data.resources as ResourceType[];
}

async function getRandomImage(type: "default" | "people" = "default") {
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

  const randomBuffer =
    type === "default" ? await getRandomPhoto() : await getRandomPeoplePhoto();
  const data = await uploadPhoto(randomBuffer);
  return data;
}
