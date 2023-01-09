import type { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import { prisma } from "../db";
import type {
  CreatePortfolioSchema,
  DeletePortfolioSchema,
  GetPortfolioSchema,
  GetPortfoliosSchema,
  UpdatePortfolioNameSchema,
  UpdatePortfolioImagesSchema,
} from "../schemas/portfolios";
import { deleteManyCloudinaryImages } from "../services/cloudinary";
import { getPaginationNextPage } from "../utils/misc";
import { paginationParams } from "../utils/pagination-params";

const transformImages = (images: string[]) => images.map((id) => ({ id }));

export const Create = async (
  req: Request<any, any, CreatePortfolioSchema["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, images } = req.body;

    const newPortfolio = await prisma.portfolioPhotos.create({
      data: {
        name,
        images: { connect: transformImages(images) },
      },
    });
    return res.send(newPortfolio);
  } catch (error) {
    next(error);
  }
};

export const GetOne = async (
  req: Request<GetPortfolioSchema["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { portfolioId } = req.params;

    const data = await prisma.portfolioPhotos.findUnique({
      where: { id: portfolioId },
      include: { images: true },
    });
    if (!data) throw createError(404, "Photo not found.");

    return res.send({ ...data });
  } catch (error) {
    next(error);
  }
};

export const Get = async (
  req: Request<any, any, any, GetPortfoliosSchema["query"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, ...pagination } = paginationParams(req.query);

    const portfolios = await prisma.portfolioPhotos.findMany({
      ...pagination,
      include: {
        images: true,
      },
    });

    const nextPage = getPaginationNextPage(portfolios, limit, page);

    return res.send({ data: portfolios.slice(0, limit), nextPage, limit });
  } catch (error) {
    next(error);
  }
};

export const Delete = async (
  req: Request<DeletePortfolioSchema["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { portfolioId } = req.params;

    const portfolio = await prisma.portfolioPhotos.findUniqueOrThrow({
      where: { id: portfolioId },
      include: { images: true },
    });
    const ids = portfolio.images.map(({ id }) => id);
    await deleteManyCloudinaryImages(ids);
    await prisma.portfolioPhotos.delete({ where: { id: portfolioId } });

    return res.send(200);
  } catch (error) {
    next(error);
  }
};

export const UpdateName = async (
  req: Request<
    UpdatePortfolioNameSchema["params"],
    any,
    UpdatePortfolioNameSchema["body"]
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { portfolioId } = req.params;
    const { name } = req.body;

    const portfolio = await prisma.portfolioPhotos.update({
      where: { id: portfolioId },
      data: {
        name: name,
      },
    });

    return res.send(portfolio);
  } catch (error) {
    next(error);
  }
};

export const UpdateImages = async (
  req: Request<
    UpdatePortfolioImagesSchema["params"],
    any,
    UpdatePortfolioImagesSchema["body"]
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { portfolioId } = req.params;
    const { images } = req.body;

    const ids = images.map((id) => ({ id }));
    const portfolio = await prisma.portfolioPhotos.update({
      where: { id: portfolioId },
      data: {
        images: { set: ids },
      },
      include: { images: true },
    });

    return res.send(portfolio);
  } catch (error) {
    next(error);
  }
};
