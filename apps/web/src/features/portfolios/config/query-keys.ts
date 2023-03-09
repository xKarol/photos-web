export const portfolioKeys = {
  all: ["portfolios"] as const,
  one: (slug: string) => [...portfolioKeys.all, slug] as const,
};
