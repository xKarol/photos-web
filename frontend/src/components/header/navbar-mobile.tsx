import Link from "next/link";
import React from "react";
import { ROUTE_ABOUT, ROUTE_CONTACT, ROUTE_HOME } from "../../constants/routes";

type Props = {
  onClose: () => void;
};

const NavbarMobile = ({ onClose }: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-white flex justify-center z-10">
      <nav className="mt-10">
        <ul className="flex flex-col space-y-5 font-light tracking-wider items-center">
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
      <div className="fixed right-5 top-5 cursor-pointer" onClick={onClose}>
        X
      </div>
    </div>
  );
};

export default NavbarMobile;
