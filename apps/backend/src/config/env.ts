import dotenv from "dotenv";
import { ZodError, z } from "zod";

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  dotenv.config();
} else {
  dotenv.config({ path: "./.env.dev" });
}

function validateEnv(env: NodeJS.ProcessEnv) {
  try {
    return z
      .object({
        DATABASE_URL: z.string().min(1),
        PORT: z.coerce.number().default(4000),
        HOST: z.string().url().min(1),
        HOST_FRONTEND: z.string().url().min(1),
        SESSION_SECRET: z.string().min(1),
        ADMIN_LOGIN: z.string().min(1),
        ADMIN_PASSWORD: z.string().min(1),
        CLOUDINARY_CLOUD_NAME: z.string().min(1),
        CLOUDINARY_API_KEY: z.string().min(1),
        CLOUDINARY_API_SECRET: z.string().min(1),
        MAIL_HOST: z.string().min(1),
        MAIL_PORT: z.string().min(1),
        MAIL_USER: z.string().min(1),
        MAIL_PASSWORD: z.string().min(1),
        MAILCHIMP_API_KEY: z.string().min(1),
        MAILCHIMP_SERVER: z.string().min(1),
        MAILCHIMP_NEWSLETTER_LIST_ID: z.string().min(1),
      })
      .required()
      .parse(env);
  } catch (e) {
    if (e instanceof ZodError) {
      for (const issue of e.issues) {
        console.log(`Invalid Env Variable: ${issue.path}`);
        console.log(`Error Message: ${issue.message}`);
      }
    }
    throw e;
  }
}

validateEnv(process.env);
