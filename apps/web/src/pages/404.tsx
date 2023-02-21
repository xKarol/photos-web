import type { NextPage } from "next";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Lottie from "lottie-react";
import { Header } from "../features/header";
import { Footer } from "../features/footer";
import Layout from "../components/layout";
import Heading from "../components/heading";
import animation404 from "../../public/assets/animations/404.json";

const Page404: NextPage = () => {
  return (
    <>
      <NextSeo title="404" noindex={true} />
      <Header />
      <Layout className="flex flex-col items-center">
        <Heading className="mb-5 text-center">
          This page is not available.
        </Heading>
        <Lottie
          className="my-5 mx-auto max-w-[500px]"
          animationData={animation404}
          loop={true}
        />
        <Link className="btn" href="/">
          Go back
        </Link>
      </Layout>
      <Footer />
    </>
  );
};

export default Page404;
