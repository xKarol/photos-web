import React, { useState } from "react";
import { useMedia } from "react-use";
import Navbar from "./components/navbar";
import Hamburger from "./components/hamburger";
import NavbarMobile from "./components/navbar-mobile";
import Layout from "../../components/layout";
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
      {isMobile || showNavbar ? (
        <Hamburger toggled={showNavbar} toggle={setShowNavbar} />
      ) : (
        <Navbar />
      )}
      {showNavbar ? <NavbarMobile /> : null}
    </Layout>
  );
};

export default Header;
