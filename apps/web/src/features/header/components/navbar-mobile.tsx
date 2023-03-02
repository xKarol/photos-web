import Link from "next/link";
import React from "react";
import { navbarItems } from "../navbar-items";

const NavbarMobile = ({ ...props }: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className="fixed inset-0 z-10 flex justify-center bg-white" {...props}>
      <nav className="mt-20 pt-10">
        <ul className="flex flex-col items-center space-y-5 text-xl font-light tracking-wider text-font [&_>*]:uppercase">
          {navbarItems.map(({ href, text }) => (
            <li key={text}>
              <Link href={href}>{text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavbarMobile;
