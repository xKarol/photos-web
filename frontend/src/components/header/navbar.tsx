import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex space-x-7 font-light tracking-wider">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
