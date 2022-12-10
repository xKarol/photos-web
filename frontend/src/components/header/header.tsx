import React, { useState } from "react";
import Layout from "../layout";
import Hamburger from "./hamburger";
import Navbar from "./navbar";
import { useMedia } from "react-use";
import NavbarMobile from "./navbar-mobile";

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const isMobile = useMedia("(max-width: 500px)", false);

  return (
    <Layout as="header" className="my-20 flex justify-between items-center">
      <figure>Logo</figure>
      {isMobile ? <Hamburger onClick={() =>  setShowNavbar(true)}/> : <Navbar />}
      {showNavbar ? <NavbarMobile onClose={() =>  setShowNavbar(false)} /> : null}
    </Layout>
  );
};

export default Header;
