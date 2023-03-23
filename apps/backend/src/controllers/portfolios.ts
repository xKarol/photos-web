import type { NextFunction, Request, Response } from "express";
import slugify from "slugify";
import type { API } from "types";
import { prisma } from "../lib/prisma";
import type * as Schema from "../schemas/portfolios";
import { deleteManyCloudinaryImages } from "../services/cloudinary";
import {
  createPortfolio,
  deletePortfolio,
  getPortfolio,
  updateImages,
  updateName,
} from "../services/portfolios";
import { paginationParams, getPaginationNextPage } from "../utils/misc";

export const Create = async (
  req: Request<unknown, unknown, Schema.CreatePortfolio["body"]>,
  res: Response<API["Portfolios"]["Create"]>,
  next: NextFunction
) => {
  try {
    const { name, images } = req.body;

    const slug = slugify(name, { lower: true });
    const portfolio = await createPortfolio({ slug, name, images });

    return res.send(portfolio);
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
    const data = await getPortfolio(slug);

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
    const data = portfolios.map((portfolio) => ({
      ...portfolio,
      // TODO add thumbnail field to prisma schema
      images: [portfolio.images[0]],
    }));

    return res.send({ data: data.slice(0, limit), nextPage, limit });
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

    const portfolio = await getPortfolio(slug);
    const ids = portfolio.images.map(({ id }) => id);
    await deleteManyCloudinaryImages(ids);
    await deletePortfolio(slug);

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

    const portfolio = await updateName(slug, name);

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

    const portfolio = await updateImages(slug, images);

    return res.send(portfolio);
  } catch (error) {
    next(error);
  }
};
