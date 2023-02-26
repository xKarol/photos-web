import { rest } from "msw";
import type { Portfolios } from "types";

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
      ctx.json<Portfolios[]>([
        {
          id: "12122",
          name: "test",
          slug: "test",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "122122",
          name: "test1",
          slug: "test1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
    );
  }),
];
