import { z } from "zod";

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

function stringAsNumber() {
  return z
    .string()
    .min(1)
    .refine((v) => {
      if (!Number.isNaN(+v) && typeof +v === "number" && +v >= 0) return true;
    }, "Query param must be a number.");
}
