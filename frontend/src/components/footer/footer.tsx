import React from "react";
import Layout from "../layout";
import Newsletter from "./newsletter";
import Socials from "./socials";

const Footer = () => {
  return (
    <Layout
      as="footer"
      className="py-20 mt-[7.5rem] flex flex-col md:flex-row justify-between"
    >
      <Newsletter />
      <Socials className="mt-10 md:mt-0" />
    </Layout>
  );
};

export default Footer;
