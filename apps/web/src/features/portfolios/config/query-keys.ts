export const queryKeys = {
  all: ["portfolios"] as const,
  one: (slug: string) => [...queryKeys.all, slug] as const,
};
