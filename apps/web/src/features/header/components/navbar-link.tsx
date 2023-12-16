import clsx from "clsx";
import Link from "next/link";
import React from "react";

type Props = { isActive: boolean } & React.ComponentProps<typeof Link>;

const NavbarLink = ({ isActive, href, className, children }: Props) => {
  return (
    <li>
      <Link
        href={href}
        className={clsx("transition-all", isActive && "font-medium", className)}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavbarLink;
