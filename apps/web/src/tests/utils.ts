import { faker } from "@faker-js/faker";
import type { Image, Portfolios } from "@app/types";

export function getFakeImageData<T extends Image>(props?: T): T {
  return {
    id: faker.database.mongodbObjectId(),
    alt: faker.lorem.words(2),
    createdAt: faker.date.past(1),
    updatedAt: faker.date.recent(),
    height: faker.datatype.number({ min: 500, max: 1200 }),
    width: faker.datatype.number({ min: 600, max: 800 }),
    mimeType: "image/webp",
    src: faker.image.imageUrl(undefined, undefined, undefined, true),
    placeholder: "...",
    ...props,
  };
}

export function getMany<T>(cb: () => T, { min = 10, max = 25 } = {}) {
  return Array.from({ length: faker.datatype.number({ min, max }) }, cb);
}

export function getFakePortfolioData<T extends Portfolios>(props?: T) {
  const name = faker.lorem.words(2);
  return {
    id: faker.database.mongodbObjectId(),
    name: name,
    slug: name.replaceAll(" ", "-"),
    images: getMany(getFakeImageData),
    createdAt: faker.date.past(1),
    updatedAt: faker.date.recent(),
    ...props,
  };
}
