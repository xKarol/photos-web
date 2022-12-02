import Link from "next/link";
import React from "react";
import Layout from "../layout";
import Navbar from "./navbar";

const Header = () => {
  return (
    <Layout as="header" className="my-20 flex justify-between">
      <figure>Logo</figure>
      <Navbar />
    </Layout>
  );
};

export default Header;
