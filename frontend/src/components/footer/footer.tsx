import React from "react";
import Layout from "../layout";
import Newsletter from "./newsletter";
import Socials from "./socials";

const Footer = () => {
  return (
    <Layout as="footer" className="py-20 mt-[7.5rem] flex justify-between">
      <Newsletter />
      <Socials />
    </Layout>
  );
};

export default Footer;
