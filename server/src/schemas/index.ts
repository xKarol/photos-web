import { z } from "zod";

export const stringAsNumber = () => {
  return z
    .string()
    .min(1)
    .refine(
      (v) => !Number.isNaN(+v) && typeof +v === "number",
      "Query param must be a number."
    );
};
