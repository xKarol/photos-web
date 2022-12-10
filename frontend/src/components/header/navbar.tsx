import Link from "next/link";
import React from "react";
import { ROUTE_ABOUT, ROUTE_CONTACT, ROUTE_HOME } from "../../constants/routes";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex space-x-7 font-light tracking-wider">
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
