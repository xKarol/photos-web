import type { NextPage } from "next";
import { NextSeo } from "next-seo";

import Layout from "../components/layout";
import { Contact as ContactContainer } from "../features/contact";
import { Footer } from "../features/footer";
import { Header } from "../features/header";

const Contact: NextPage = () => {
  return (
    <>
      <NextSeo title="Contact" />
      <Header />
      <Layout as="main">
        <ContactContainer />
      </Layout>
      <Footer />
    </>
  );
};

export default Contact;
