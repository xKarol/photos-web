import dotenv from "dotenv";

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  dotenv.config();
} else {
  dotenv.config({ path: "./.env.dev" });
}
