import type { Contact } from "@app/prisma";

type ReturnStatus = void | unknown;

export interface Api {
  create: (payload: CreateContactPayload) => Promise<ApiResponse["create"]>;
  delete: (contactId: string) => Promise<ApiResponse["delete"]>;
}

export interface Services extends Api {
  delete: (contactId: string) => Promise<Contact>;
}

export type ApiResponse = {
  create: Contact;
  delete: ReturnStatus;
};

export type CreateContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};
