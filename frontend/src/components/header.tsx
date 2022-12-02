import Link from "next/link";
import React from "react";
import Layout from "./layout";

const Header = () => {
  return (
    <Layout as="header" className="my-20 flex justify-between">
      <figure>Logo</figure>
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
    </Layout>
  );
};

export default Header;
