import type {
  Contact,
  Image,
  NewsletterSubscriber,
  NewsletterTemplate,
  Portfolios,
} from "backend/prisma/types";

type Pagination<T> = {
  data: T;
  nextPage: number | undefined;
  limit: number;
};

export * from "backend/prisma/types";

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
  };
  Newsletter: {
    Subscribe: NewsletterSubscriber;
    CreateTemplate: NewsletterTemplate;
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
