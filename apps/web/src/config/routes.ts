const staticRoutes = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PORTFOLIOS: "/portfolio",
} satisfies Record<string, string>;

const dynamicRoutes = {
  portfolio: (slug) => `${slug}`,
} satisfies Record<string, (slug: string) => string>;

type Routes = Record<string, string | ((slug: string) => string)>;

const routes = {
  ...staticRoutes,
  ...dynamicRoutes,
} satisfies Routes;

export default routes;
