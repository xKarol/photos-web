import {
  ROUTE_HOME,
  ROUTE_PORTFOLIO,
  ROUTE_ABOUT,
  ROUTE_CONTACT,
} from "../../constants/routes";

export const navbarItems: { id: number; text: string; href: string }[] = [
  { id: 1, href: ROUTE_HOME, text: "Home" },
  { id: 2, href: ROUTE_PORTFOLIO, text: "Portfolio" },
  { id: 3, href: ROUTE_ABOUT, text: "About" },
  { id: 4, href: ROUTE_CONTACT, text: "Contact" },
];
