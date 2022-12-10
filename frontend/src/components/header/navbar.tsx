import Link from "next/link";
import React from "react";
import { ROUTE_ABOUT, ROUTE_CONTACT, ROUTE_HOME } from "../../constants/routes";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex space-x-10 font-light tracking-wider text-font uppercase text-sm">
        <li>
          <Link href={ROUTE_HOME}>Home</Link>
        </li>
        <li>
          <Link href={ROUTE_ABOUT}>About</Link>
        </li>
        <li>
          <Link href={ROUTE_CONTACT}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
