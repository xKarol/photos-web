import {
  ROUTE_HOME,
  ROUTE_PORTFOLIO,
  ROUTE_ABOUT,
  ROUTE_CONTACT,
} from "../../constants/routes";

export const navbarItems: { text: string; href: string }[] = [
  { href: ROUTE_HOME, text: "Home" },
  { href: ROUTE_PORTFOLIO, text: "Portfolio" },
  { href: ROUTE_ABOUT, text: "About" },
  { href: ROUTE_CONTACT, text: "Contact" },
];
