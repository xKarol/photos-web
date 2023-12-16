import prisma from "@app/prisma";
import type { Portfolio } from "@app/types";

import createError from "http-errors";

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

  return {
    data: response.slice(0, limit),
    nextPage: response.length > limit ? page + 1 : undefined,
  };
};

export const getPortfolio: Portfolio.Services["findOne"] = async (
  portfolioSlug
) => {
  try {
    const data = await prisma.portfolios.findUniqueOrThrow({
      where: { slug: portfolioSlug },
      include: { images: true },
    });
    return data;
  } catch {
    throw createError(404, "Portfolio not found.");
  }
};

export const createPortfolio: Portfolio.Services["create"] = async (
  payload
) => {
  try {
    const { slug, name, images } = payload;
    const response = (await prisma.portfolios.create({
      data: {
        slug,
        name,
        images: { connect: transformImages(images) },
      },
    })) as Awaited<ReturnType<Portfolio.Services["create"]>>; //TODO why prisma return wrong types?
    return response;
  } catch {
    throw createError(400, "Could not create portfolio.");
  }
};

export const deletePortfolio: Portfolio.Services["delete"] = async (
  portfolioSlug
) => {
  try {
    const response = await prisma.portfolios.delete({
      where: { slug: portfolioSlug },
    });
    return response;
  } catch {
    throw createError(404, "Photo not found.");
  }
};

export const updateName: Portfolio.Services["updateName"] = async (
  portfolioSlug,
  newName
) => {
  try {
    const response = await prisma.portfolios.update({
      where: { slug: portfolioSlug },
      data: {
        name: newName,
      },
    });
    return response;
  } catch {
    throw createError(400, "Could not update portfolio.");
  }
};

export const updateImages: Portfolio.Services["updateImages"] = async (
  portfolioSlug,
  imagesIds
) => {
  try {
    const response = await prisma.portfolios.update({
      where: { slug: portfolioSlug },
      data: {
        images: { set: transformImages(imagesIds) },
      },
      include: { images: true },
    });
    return response;
  } catch {
    throw createError(400, "Could not update portfolio images.");
  }
};

function transformImages(images: string[]) {
  return images.map((id) => ({ id }));
}
