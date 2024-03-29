import { getBufferFromUrl } from "../../apps/backend/src/utils/misc";
import { faker } from "@faker-js/faker";
import { type Image, type Portfolios } from "@prisma/client";
import slugify from "slugify";

export const getFakePhotoData = (): Pick<Image, "alt"> => {
  return {
    alt: faker.lorem.words(2),
  };
};

export const getFakePortfolioData = (
  uniqueName: string
): Omit<Portfolios, "id" | "createdAt" | "updatedAt"> => {
  return {
    name: uniqueName,
    slug: slugify(uniqueName, { lower: true }),
  };
};

export function randomBetween(min: number, max: number) {
  return faker.number.int({ min, max });
}

export async function getRandomPhoto() {
  const buffer = await getBufferFromUrl(
    faker.image.urlPicsumPhotos({
      height: 1280,
      width: randomBetween(1280, 2560),
    })
  );
  return buffer;
}

export function measureTime() {
  const start = performance.now();

  return {
    end: () => {
      const end = performance.now();
      return +(end - start).toFixed(0) / 1000;
    },
  };
}
