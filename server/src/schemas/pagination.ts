import { z } from "zod";

import { stringAsNumber } from ".";

export const paginationSchema = () => {
  return z.object({
    page: stringAsNumber().optional(),
    limit: stringAsNumber().optional(),
  });
};
