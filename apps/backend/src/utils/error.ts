import createError from "http-errors";
import { ZodError } from "zod";

import type { ErrorSchema } from "../schemas/error";

function getErrorMessage(error: unknown) {
  if (error instanceof ZodError) return error.errors[0].message;
  if (error instanceof Error) return error.message;
  return String(error);
}

export type ReportError = {
  status: number;
  message: string;
};

export const reportError = (error: unknown): ErrorSchema => {
  const message = getErrorMessage(error);
  const errorData = error instanceof createError.HttpError ? error : undefined;
  const status: number = errorData ? errorData.statusCode : 400;
  const stack = errorData ? errorData.stack : undefined;
  return {
    status,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack }),
  };
};
