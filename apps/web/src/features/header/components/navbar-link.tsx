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
          "relative transition-all before:absolute before:top-5 before:left-1/2 before:h-[3px] before:w-[3px] before:rounded-full before:bg-font",
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
