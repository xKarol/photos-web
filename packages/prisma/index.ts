import { PrismaClient } from "@prisma/client";

const isProduction = (process.env.NODE_ENV as string) === "production";
const isDevelopment = (process.env.NODE_ENV as string) === "development";

const prisma = new PrismaClient({
  log: isDevelopment ? ["query"] : [],
  errorFormat: isProduction ? "minimal" : "colorless",
});

export default prisma;

export * from "@prisma/client";
