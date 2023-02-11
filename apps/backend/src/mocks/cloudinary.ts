import { rest } from "msw";
import crypto from "node:crypto";
import * as upload from "../services/cloudinary";

export const cloudinaryHandlers = [
  rest.post(
    "https://api.cloudinary.com/v1_1/:any/image/destroy",
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
];

jest.mock("../services/cloudinary");

export default jest.spyOn(upload, "uploadPhoto").mockImplementation(() => {
  const uniqueId = crypto.randomUUID();
  return Promise.resolve({
    id: uniqueId,
    src: `test/${uniqueId}`,
    width: 500,
    height: 500,
    placeholder: "test",
    mimeType: "image/webp",
  });
});
