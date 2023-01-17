import type { CorsOptions } from "cors";

const whiteList = new Set([process.env.HOST, process.env.HOST_FRONTEND]);

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
