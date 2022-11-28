import React from "react";
import Layout from "../layout";
import Newsletter from "./newsletter";

const Footer = () => {
  return (
    <Layout as="footer" className="py-20 mt-[7.5rem] flex flex-col">
      <h1 className="text-lg uppercase tracking-widest mb-2">Newsletter</h1>
      <Newsletter />
    </Layout>
  );
};

export default Footer;
