import type { Contact } from "@app/prisma";

type ReturnStatus = void | unknown;

export interface Api {
  create: (payload: CreateContactPayload) => Promise<Contact>;
  delete: (contactId: string) => Promise<ReturnStatus>;
}

export interface Services extends Api {
  delete: (contactId: string) => Promise<Contact>;
}

export type CreateContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};
