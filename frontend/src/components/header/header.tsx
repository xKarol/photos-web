import React, { useState } from "react";
import Layout from "../layout";
import Hamburger from "./hamburger";
import Navbar from "./navbar";
import { useMedia } from "react-use";
import NavbarMobile from "./navbar-mobile";
import Logo from "../logo";

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const isMobile = useMedia("(max-width: 500px)", false);

  return (
    <Layout
      as="header"
      className="my-10 lg:my-20 flex justify-between items-center"
    >
      <Logo />
      {isMobile ? (
        <Hamburger onClick={() => setShowNavbar(true)} />
      ) : (
        <Navbar />
      )}
      {showNavbar ? (
        <NavbarMobile onClose={() => setShowNavbar(false)} />
      ) : null}
    </Layout>
  );
};

export default Header;
