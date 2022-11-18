import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="container mx-auto my-20 font-light flex justify-between">
      <figure>Logo</figure>
      <nav>
        <ul className="flex space-x-7">
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
    </header>
  );
};

export default Header;
