import { errorSchema } from "../schemas/error";

export function parseError(body: unknown) {
  return errorSchema.safeParse(body).success;
}
