import { rest } from "msw";

export const handlers = [
  rest.post("/newsletter/subscribe", (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post("/contact", (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
