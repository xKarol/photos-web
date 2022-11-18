function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export type ReportError = {
  status: number;
  message: string;
};

export const reportError = (error: unknown) => {
  const message = getErrorMessage(error);
  const status: number = (error as any).statusCode || 400;

  return {
    status,
    message,
  };
};
