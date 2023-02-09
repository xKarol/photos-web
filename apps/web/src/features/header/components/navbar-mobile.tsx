import Link from "next/link";
import React from "react";
import { HiX } from "react-icons/hi";
import { navbarItems } from "../navbar-items";

type Props = {
  onClose: () => void;
};

const NavbarMobile = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-10 flex justify-center bg-white">
      <nav className="mt-20">
        <ul className="flex flex-col items-center space-y-5 text-xl font-light tracking-wider text-font [&_>*]:uppercase">
          {navbarItems.map(({ href, text }) => (
            <li key={text}>
              <Link href={href}>{text}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <HiX
        className="fixed right-5 top-5 cursor-pointer text-2xl text-font"
        onClick={onClose}
      />
    </div>
  );
};

export default NavbarMobile;
