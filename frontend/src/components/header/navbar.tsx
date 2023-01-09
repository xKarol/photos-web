import Link from "next/link";
import React from "react";
import { navbarItems } from "./navbar-items";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex space-x-5 font-light tracking-wider text-font uppercase text-sm">
        {navbarItems.map(({ id, href, text }) => (
          <li key={id}>
            <Link
              href={href}
              className="hover:bg-secondary px-3 py-2 rounded-sm transition-colors"
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
