import prisma from "@app/prisma";
import type { Portfolio } from "@app/types";

import { getPaginationData } from "../utils/misc";

export const getPortfolios: Portfolio.Services["findAll"] = async ({
  page = 1,
  skip,
  limit = 10,
}) => {
  const response = await prisma.portfolios.findMany({
    skip: skip,
    take: limit + 1,
    include: {
      images: true,
    },
  });

  return getPaginationData(response, { page, limit });
};

export const getPortfolio: Portfolio.Services["findOne"] = async (
  portfolioSlug
) => {
  const data = await prisma.portfolios.findUniqueOrThrow({
    where: { slug: portfolioSlug },
    include: { images: true },
  });
  return data;
};

export const createPortfolio: Portfolio.Services["create"] = async (
  payload
) => {
  const { slug, name, images } = payload;
  const response = (await prisma.portfolios.create({
    data: {
      slug,
      name,
      images: { connect: transformImages(images) },
    },
  })) as Awaited<ReturnType<Portfolio.Services["create"]>>; //TODO why prisma return wrong types?
  return response;
};

export const deletePortfolio: Portfolio.Services["delete"] = async (
  portfolioSlug
) => {
  const response = await prisma.portfolios.delete({
    where: { slug: portfolioSlug },
  });
  return response;
};

export const updateName: Portfolio.Services["updateName"] = async (
  portfolioSlug,
  newName
) => {
  const response = await prisma.portfolios.update({
    where: { slug: portfolioSlug },
    data: {
      name: newName,
    },
  });
  return response;
};

export const updateImages: Portfolio.Services["updateImages"] = async (
  portfolioSlug,
  imagesIds
) => {
  const response = await prisma.portfolios.update({
    where: { slug: portfolioSlug },
    data: {
      images: { set: transformImages(imagesIds) },
    },
    include: { images: true },
  });
  return response;
};

function transformImages(images: string[]) {
  return images.map((id) => ({ id }));
}
