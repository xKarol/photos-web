import clsx from "clsx";
import Link from "next/link";
import React from "react";

type Props = { isActive: boolean } & React.ComponentProps<typeof Link>;

const NavbarLink = ({ isActive, href, className, children }: Props) => {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative before:rounded-full before:bg-font before:w-[3px] before:h-[3px] before:absolute before:top-5 before:left-1/2 transition-all",
          isActive ? "before:opacity-1" : "before:opacity-0",
          className
        )}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavbarLink;
