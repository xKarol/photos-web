import { PrismaClient } from "@prisma/client";

/* eslint no-var: off */
declare global {
  var prisma: PrismaClient | undefined;
}

const isProduction = (process.env.NODE_ENV as string) === "production";
const isDevelopment = (process.env.NODE_ENV as string) === "development";

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: isDevelopment ? ["query"] : [],
    errorFormat: isProduction ? "minimal" : "colorless",
  });

if (!isProduction) global.prisma = prisma;

export * from "@prisma/client";
