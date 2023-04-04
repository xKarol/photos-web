import { Contact } from "@app/types";

export type FormValues = Pick<
  Contact,
  "firstName" | "lastName" | "email" | "subject" | "message"
>;
