import type { Image, Portfolios } from "@app/types";

import { faker } from "@faker-js/faker";

export function getFakeImageData<T extends Image>(props?: T): T {
  const createdAt = faker.date.recent();
  return {
    id: faker.database.mongodbObjectId(),
    alt: faker.lorem.words(2),
    createdAt: createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: Date.now() }),
    height: faker.number.int({ min: 500, max: 1200 }),
    width: faker.number.int({ min: 600, max: 800 }),
    mimeType: "image/webp",
    src: faker.image.url(),
    placeholder: "...",
    ...props,
  };
}

export function getMany<T>(cb: () => T, { min = 10, max = 25 } = {}) {
  return Array.from({ length: faker.number.int({ min, max }) }, cb);
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
