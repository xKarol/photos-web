import React from "react";
import { useRouter } from "next/router";
import { navbarItems } from "../navbar-items";
import NavbarLink from "./navbar-link";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav>
      <ul className="flex space-x-5 text-sm font-light uppercase tracking-wider text-font">
        {navbarItems.map(({ href, text }) => (
          <NavbarLink key={text} href={href} isActive={router.route === href}>
            {text}
          </NavbarLink>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
