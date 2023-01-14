import { rest } from "msw";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const handlers = [
  rest.post(`${BACKEND_URL}/newsletter/subscribe`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`${BACKEND_URL}/contact`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
