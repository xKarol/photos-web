import { z } from "zod";

export function stringAsNumber(errorMsg = "Query param must be a number.") {
  return z
    .string()
    .min(1)
    .refine((v) => {
      if (!Number.isNaN(+v) && typeof +v === "number" && +v >= 0) return true;
    }, errorMsg);
}
