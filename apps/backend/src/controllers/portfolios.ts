import type { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import slugify from "slugify";
import invariant from "tiny-invariant";
import type { API } from "types";

import { prisma } from "../db";
import type * as Schema from "../schemas/portfolios";
import { deleteManyCloudinaryImages } from "../services/cloudinary";
import { paginationParams, getPaginationNextPage } from "../utils/misc";

const transformImages = (images: string[]) => images.map((id) => ({ id }));

export const Create = async (
  req: Request<unknown, unknown, Schema.CreatePortfolio["body"]>,
  res: Response<API["Portfolios"]["Create"]>,
  next: NextFunction
) => {
  try {
    const { name, images } = req.body;

    const slug = slugify(name, { lower: true });

    const newPortfolio = (await prisma.portfolios.create({
      data: {
        slug,
        name,
        images: { connect: transformImages(images) },
      },
    })) as API["Portfolios"]["Create"]; //TODO why prisma return wrong types?

    invariant(!newPortfolio?.images, "Something went wrong");

    return res.send(newPortfolio);
  } catch (error) {
    next(error);
  }
};

export const GetOne = async (
  req: Request<Schema.GetPortfolio["params"]>,
  res: Response<API["Portfolios"]["GetOne"]>,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const data = await prisma.portfolios.findUnique({
      where: { slug: slug },
      include: { images: true },
    });
    if (!data) throw createError(404, "Photo not found.");

    return res.send(data);
  } catch (error) {
    next(error);
  }
};

export const Get = async (
  req: Request<unknown, unknown, unknown, Schema.GetPortfolios["query"]>,
  res: Response<API["Portfolios"]["Get"]>,
  next: NextFunction
) => {
  try {
    const { page, limit, ...pagination } = paginationParams(req.query);

    const portfolios = await prisma.portfolios.findMany({
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
  req: Request<Schema.DeletePortfolio["params"]>,
  res: Response<API["Portfolios"]["Delete"]>,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const portfolio = await prisma.portfolios.findUniqueOrThrow({
      where: { slug: slug },
      include: { images: true },
    });
    const ids = portfolio.images.map(({ id }) => id);
    await deleteManyCloudinaryImages(ids);
    await prisma.portfolios.delete({ where: { slug: slug } });

    return res.send(200);
  } catch (error) {
    next(error);
  }
};

export const UpdateName = async (
  req: Request<
    Schema.UpdatePortfolioName["params"],
    unknown,
    Schema.UpdatePortfolioName["body"]
  >,
  res: Response<API["Portfolios"]["UpdateName"]>,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;

    const portfolio = await prisma.portfolios.update({
      where: { slug: slug },
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
    Schema.UpdatePortfolioImages["params"],
    unknown,
    Schema.UpdatePortfolioImages["body"]
  >,
  res: Response<API["Portfolios"]["UpdateImages"]>,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;
    const { images } = req.body;

    const ids = images.map((id) => ({ id }));
    const portfolio = await prisma.portfolios.update({
      where: { slug: slug },
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