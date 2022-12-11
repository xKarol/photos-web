import Link from "next/link";
import React from "react";
import { ROUTE_ABOUT, ROUTE_CONTACT, ROUTE_HOME } from "../../constants/routes";
import { HiX } from "react-icons/hi";

type Props = {
  onClose: () => void;
};

const NavbarMobile = ({ onClose }: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-white flex justify-center z-10">
      <nav className="mt-20">
        <ul className="flex flex-col space-y-5 text-xl font-light [&_>*]:uppercase text-font tracking-wider items-center">
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
      <HiX
        className="fixed right-5 top-5 cursor-pointer text-2xl text-font"
        onClick={onClose}
      />
    </div>
  );
};

export default NavbarMobile;
