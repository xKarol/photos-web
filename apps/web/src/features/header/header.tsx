import React, { useState } from "react";
import Layout from "../../components/layout";
import Hamburger from "./components/hamburger";
import Navbar from "./components/navbar";
import { useMedia } from "react-use";
import NavbarMobile from "./components/navbar-mobile";
import Logo from "../../components/logo";

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const isMobile = useMedia("(max-width: 500px)", false);

  return (
    <Layout
      as="header"
      className="my-10 flex items-center justify-between lg:my-20"
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
