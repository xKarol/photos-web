type RouteValue = string | ((...args: string[]) => string);
type Route = {
  [key: string]: RouteValue | Route;
};

export const apiUrls = {
  contact: {
    create: "/contact",
    delete: (contactId) => `/contact/${contactId}` as const,
  },
  image: {
    findOne: (imageId) => `/images/${imageId}` as const,
  },
  photo: {
    create: "/photos",
    findAll: "/photos",
    findOne: (photoId) => `/photos/${photoId}` as const,
    delete: (photoId) => `/photos/${photoId}` as const,
  },
  portfolio: {
    create: "/portfolios",
    findAll: "/portfolios",
    findOne: (portfolioId) => `/portfolios/${portfolioId}` as const,
    delete: (portfolioId) => `/portfolios/${portfolioId}` as const,
    updateImages: (portfolioSlug) =>
      `/portfolios/${portfolioSlug}/images` as const,
    updateName: (portfolioSlug) => `/portfolios/${portfolioSlug}/name` as const,
  },
  newsletter: {
    subscribe: "/newsletter/subscribe",
  },
} as const satisfies Route;
