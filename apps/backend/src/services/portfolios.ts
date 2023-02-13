import createError from "http-errors";
import type { API } from "types";
import { prisma } from "../lib/prisma";
import type { CreatePortfolio } from "../schemas/portfolios";

export const createPortfolio = async ({
  slug,
  name,
  images,
}: CreatePortfolio["body"] & { slug: string }) => {
  const response = (await prisma.portfolios.create({
    data: {
      slug,
      name,
      images: { connect: transformImages(images) },
    },
  })) as API["Portfolios"]["Create"]; //TODO why prisma return wrong types?

  if (!response?.images) throw createError(400, "Could not create portfolio.");
  return response;
};

export const getPortfolio = async (portfolioSlug: string) => {
  const data = await prisma.portfolios.findUnique({
    where: { slug: portfolioSlug },
    include: { images: true },
  });
  if (!data) throw createError(404, "Portfolio not found.");
  return data;
};

export const deletePortfolio = async (portfolioSlug: string) => {
  try {
    const response = await prisma.portfolios.delete({
      where: { slug: portfolioSlug },
    });
    return response;
  } catch {
    throw createError(404, "Photo not found.");
  }
};

export const updateName = async (portfolioSlug: string, newName: string) => {
  const response = await prisma.portfolios.update({
    where: { slug: portfolioSlug },
    data: {
      name: newName,
    },
  });
  if (!response) throw createError(400, "Could not update portfolio.");
  return response;
};

export const updateImages = async (
  portfolioSlug: string,
  imagesIds: string[]
) => {
  const response = await prisma.portfolios.update({
    where: { slug: portfolioSlug },
    data: {
      images: { set: transformImages(imagesIds) },
    },
    include: { images: true },
  });
  if (!response) throw createError(400, "Could not update portfolio images.");
  return response;
};

function transformImages(images: string[]) {
  return images.map((id) => ({ id }));
}
