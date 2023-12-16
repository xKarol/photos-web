import type { Contact } from "@app/prisma";

export type FormValues = Pick<
  Contact,
  "firstName" | "lastName" | "email" | "subject" | "message"
>;
