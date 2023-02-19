import { z } from "zod";
import { stringAsNumber } from "./misc";

export const paginationSchema = () => {
  return z.object({
    page: stringAsNumber()
      .refine(
        (v) => (+v > 0 ? true : false),
        "Page must be greater or equal 1."
      )
      .optional(),
    limit: stringAsNumber()
      .refine(
        (v) => (+v > 0 ? true : false),
        "Limit must be greather or equal 1."
      )
      .refine(
        (v) => (+v <= 100 ? true : false),
        "Limit must be less or equal 100."
      )
      .optional(),
  });
};
