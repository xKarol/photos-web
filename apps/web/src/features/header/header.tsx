import clsx from "clsx";
import React, { useState } from "react";
import { useLockBodyScroll } from "react-use";

import Layout from "../../components/layout";
import Logo from "../../components/logo";
import Hamburger from "./components/hamburger";
import Navbar from "./components/navbar";
import NavbarMobile from "./components/navbar-mobile";

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  useLockBodyScroll(showNavbar);

  return (
    <Layout
      as="header"
      className="my-10 flex items-center justify-between lg:my-20"
    >
      <Logo />
      <Hamburger
        className={clsx("sm:hidden", showNavbar && "!block")}
        toggled={showNavbar}
        toggle={setShowNavbar}
      />
      <Navbar
        className={clsx("hidden sm:block", showNavbar && "!hidden")}
        data-testid="desktop navbar"
      />
      {showNavbar ? <NavbarMobile data-testid="mobile navbar" /> : null}
    </Layout>
  );
};

export default Header;
