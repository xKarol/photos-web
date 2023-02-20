import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { Header } from "../features/header";
import { Footer } from "../features/footer";
import { Contact as ContactContrainer } from "../features/contact";
import Layout from "../components/layout";

const Contact: NextPage = () => {
  return (
    <>
      <NextSeo title="Contact" />
      <Header />
      <Layout as="main">
        <ContactContrainer />
      </Layout>
      <Footer />
    </>
  );
};

export default Contact;
