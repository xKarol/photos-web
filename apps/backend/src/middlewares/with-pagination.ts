import type { Handler } from "express";
import z from "zod";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      pagination: {
        limit: number;
        skip: number;
        page: number;
      };
    }
  }
}

const paginationParams = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).optional().default(10),
});

export const withPagination: Handler = async (req, res, next) => {
  try {
    const { page, limit } = paginationParams.parse(req.query);
    const skip = (page - 1) * limit;
    req.pagination = {
      page,
      limit,
      skip,
    };
    next();
  } catch (error) {
    next(error);
  }
};
