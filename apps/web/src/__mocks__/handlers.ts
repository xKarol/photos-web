import type { Portfolio } from "@app/types";

import { rest } from "msw";

import { getFakePortfolioData, getMany } from "../tests/utils";

export const handlers = [
  rest.post(`/newsletter/subscribe`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`/contact`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`/portfolios`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<Awaited<ReturnType<Portfolio.Api["findAll"]>>>({
        nextPage: 2,
        data: getMany(getFakePortfolioData, { min: 5, max: 20 }),
      })
    );
  }),
];
