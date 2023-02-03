import React from "react";
import { navbarItems } from "../navbar-items";
import { useRouter } from "next/router";
import NavbarLink from "./navbar-link";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav>
      <ul className="flex space-x-5 font-light tracking-wider text-font uppercase text-sm">
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
