import type { Contact } from "@app/types";

export type FormValues = Pick<
  Contact,
  "firstName" | "lastName" | "email" | "subject" | "message"
>;
