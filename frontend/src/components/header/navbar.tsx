import Link from "next/link";
import React from "react";
import {
  ROUTE_ABOUT,
  ROUTE_CONTACT,
  ROUTE_HOME,
  ROUTE_PORTFOLIO,
} from "../../constants/routes";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex space-x-5 font-light tracking-wider text-font uppercase text-sm">
        <li>
          <Link
            href={ROUTE_HOME}
            className="hover:bg-secondary px-3 py-2 rounded-sm transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={ROUTE_PORTFOLIO}
            className="hover:bg-secondary px-3 py-2 rounded-sm transition-colors"
          >
            Portfolio
          </Link>
        </li>
        <li>
          <Link
            href={ROUTE_ABOUT}
            className="hover:bg-secondary px-3 py-2 rounded-sm transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href={ROUTE_CONTACT}
            className="hover:bg-secondary px-3 py-2 rounded-sm transition-colors"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
