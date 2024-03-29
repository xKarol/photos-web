import React from "react";

import Layout from "../../components/layout";
import Newsletter from "./components/newsletter";
import SocialLinks from "./components/social-links";

const Footer = () => {
  return (
    <Layout
      as="footer"
      className="mt-[7.5rem] flex flex-col justify-between py-20 md:flex-row"
    >
      <Newsletter />
      <SocialLinks className="mt-10 md:mt-0" />
    </Layout>
  );
};

export default Footer;
