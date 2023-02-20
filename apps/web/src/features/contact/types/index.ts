import { Contact } from "types";

export type FormValues = Pick<
  Contact,
  "firstName" | "lastName" | "email" | "subject" | "message"
>;
