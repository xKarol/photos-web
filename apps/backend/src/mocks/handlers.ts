// import { rest } from "msw";
import { cloudinaryHandlers } from "./cloudinary";

export const handlers = [
  ...cloudinaryHandlers,
  //   rest.get("url", (req, res, ctx) => {
  //     return res(ctx.json({ test: "test" }));
  //   }),
];
