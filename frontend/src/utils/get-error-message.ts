import { AxiosError } from "axios";
import { ZodError } from "zod";

export const getErrorMessage = (error: unknown) => {
  const defaultError = "Unknown error";
  if (error instanceof AxiosError)
    return error.response?.data.message || defaultError;
  if (error instanceof Error) return error.message;
  if (error instanceof ZodError) return error.errors[0].message;
  return defaultError;
};
