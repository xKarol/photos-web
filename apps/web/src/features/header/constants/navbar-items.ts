import routes from "../../../config/routes";

export const navbarItems: { text: string; href: string }[] = [
  { href: routes.HOME, text: "Home" },
  { href: routes.PORTFOLIOS, text: "Portfolio" },
  { href: routes.ABOUT, text: "About" },
  { href: routes.CONTACT, text: "Contact" },
];
