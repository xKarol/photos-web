import type { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import { prisma } from "../db";
import type {
  CreatePortfolioSchema,
  DeletePortfolioSchema,
  GetPortfolioSchema,
  GetPortfoliosSchema,
} from "../schemas/portfolios";
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
    });
    if (!data) throw createError(404, "Photo not found.");

    return res.send(data);
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

    await prisma.portfolioPhotos.delete({ where: { id: portfolioId } });

    return res.send(200);
  } catch (error) {
    next(error);
  }
};
