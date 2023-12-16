import { Contact, Image, Portfolios } from "@app/prisma";

export type Pagination<T> = {
  data: T;
  nextPage: number | undefined;
  limit: number;
};

export * from "@app/prisma";

type ReturnStatus = void | unknown;

export type API = {
  About: {
    Upload: Image;
    Get: Image;
  };
  Contact: {
    Create: Contact;
    Delete: ReturnStatus;
  };
  Image: {
    GetOne: ArrayBuffer;
    GetPlaceholder: ArrayBuffer;
  };
  Newsletter: {
    Subscribe: ReturnStatus;
  };
  Photos: {
    Create: Image;
    GetOne: Image;
    Get: Pagination<Image[]>;
    Delete: ReturnStatus;
  };
  Portfolios: {
    Create: Portfolios & { images: Image[] };
    GetOne: Portfolios & { images: Image[] };
    Get: Pagination<(Portfolios & { images: Image[] })[]>;
    Delete: ReturnStatus;
    UpdateName: Portfolios;
    UpdateImages: Portfolios & { images: Image[] };
  };
};
