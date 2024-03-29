import Lottie from "lottie-react";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";

import animation404 from "../../public/assets/animations/404.json";
import Heading from "../components/heading";
import Layout from "../components/layout";
import routes from "../config/routes";
import { Footer } from "../features/footer";
import { Header } from "../features/header";

const Page404: NextPage = () => {
  return (
    <>
      <NextSeo title="404" noindex={true} />
      <Header />
      <Layout as="main" className="flex flex-col items-center">
        <Heading className="mb-5 text-center">
          This page is not available
        </Heading>
        <Lottie
          className="mx-auto my-5 max-w-[500px]"
          aria-label="no data animation"
          role="alert"
          animationData={animation404}
          loop={true}
        />
        <Link className="btn" href={routes.HOME}>
          Go back
        </Link>
      </Layout>
      <Footer />
    </>
  );
};

export default Page404;
