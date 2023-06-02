import Image from "next/image";
import React from "react";

import aboutImg from "../../../public/assets/about.jpg";
import ContactForm from "./components/form";

const Contact = () => {
  return (
    <div className="flex columns-2 flex-col space-y-20 md:flex-row md:space-x-10 md:space-y-0 lg:space-x-20">
      <div className="flex-1">
        <Image
          src={aboutImg}
          alt="contact image"
          width={500}
          height={600}
          style={{ objectFit: "cover" }}
          className="max-h-[600px] w-full"
        />
      </div>
      <div className="flex-1">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
