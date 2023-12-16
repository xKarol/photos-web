import type { Portfolio } from "@app/types";

import type { NextFunction, Request, Response } from "express";
import slugify from "slugify";

import type * as Schema from "../schemas/portfolios";
import { deleteManyCloudinaryImages } from "../services/cloudinary";
import {
  createPortfolio,
  deletePortfolio,
  getPortfolio,
  getPortfolios,
  updateImages,
  updateName,
} from "../services/portfolios";

export const Create = async (
  req: Request<unknown, unknown, Schema.CreatePortfolio["body"]>,
  res: Response<Awaited<ReturnType<Portfolio.Api["create"]>>>,
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
  res: Response<Awaited<ReturnType<Portfolio.Api["findOne"]>>>,
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
  res: Response<Awaited<ReturnType<Portfolio.Api["findAll"]>>>,
  next: NextFunction
) => {
  try {
    const paginationParams = req.pagination;

    const data = await getPortfolios({
      ...paginationParams,
    });

    return res.send(data);
  } catch (error) {
    next(error);
  }
};

export const Delete = async (
  req: Request<Schema.DeletePortfolio["params"]>,
  res: Response<Awaited<ReturnType<Portfolio.Api["delete"]>>>,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const portfolio = await getPortfolio(slug);
    const ids = portfolio.images.map(({ id }) => id);
    await deleteManyCloudinaryImages(ids);
    await deletePortfolio(slug);

    return res.sendStatus(200);
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
  res: Response<Awaited<ReturnType<Portfolio.Api["updateName"]>>>,
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
  res: Response<Awaited<ReturnType<Portfolio.Api["updateImages"]>>>,
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
