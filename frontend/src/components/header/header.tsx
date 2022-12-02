import React from "react";
import Layout from "../layout";
import Hamburger from "./hamburger";
import Navbar from "./navbar";
import { useMedia } from "react-use";

const Header = () => {
  const isMobile = useMedia("(max-width: 500px)");

  return (
    <Layout as="header" className="my-20 flex justify-between items-center">
      <figure>Logo</figure>
      {isMobile ? <Hamburger /> : <Navbar />}
    </Layout>
  );
};

export default Header;
