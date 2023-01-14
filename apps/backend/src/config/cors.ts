import type { CorsOptions } from "cors";

const whiteList = [process.env.HOST, process.env.HOST_FRONTEND];

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
