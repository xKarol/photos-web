import { useRouter } from "next/router";
import React from "react";

import { navbarItems } from "../constants/navbar-items";
import NavbarLink from "./navbar-link";

type Props = React.ComponentPropsWithoutRef<"nav">;

const Navbar = ({ ...props }: Props) => {
  const router = useRouter();
  return (
    <nav {...props}>
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
