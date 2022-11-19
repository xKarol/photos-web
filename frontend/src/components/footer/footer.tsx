import React from "react";
import Newsletter from "./newsletter";

const Footer = () => {
  return (
    <footer className="container mx-auto py-20 mt-[7.5rem] flex flex-col">
      <h1 className="text-lg uppercase tracking-widest mb-2">Newsletter</h1>
      <Newsletter />
    </footer>
  );
};

export default Footer;
