import React from "react";
import Layout from "../../components/layout";
import Newsletter from "./components/newsletter";
import Socials from "./components/socials";

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
