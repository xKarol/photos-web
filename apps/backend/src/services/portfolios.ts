import createError from "http-errors";
import type { API } from "types";
import { prisma } from "../lib/prisma";
import type { CreatePortfolio } from "../schemas/portfolios";

export const createPortfolio = async ({
  slug,
  name,
  images,
}: CreatePortfolio["body"] & { slug: string }) => {
  try {
    const response = (await prisma.portfolios.create({
      data: {
        slug,
        name,
        images: { connect: transformImages(images) },
      },
    })) as API["Portfolios"]["Create"]; //TODO why prisma return wrong types?
    return response;
  } catch {
    throw createError(400, "Could not create portfolio.");
  }
};

export const getPortfolio = async (portfolioSlug: string) => {
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

export const updateImages = async (
  portfolioSlug: string,
  imagesIds: string[]
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
