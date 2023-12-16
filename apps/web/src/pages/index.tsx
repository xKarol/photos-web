import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";

import Layout from "../components/layout";
import { Footer } from "../features/footer";
import { Header } from "../features/header";
import { Photos } from "../features/photos";
import { queryOptions } from "../features/photos/config/react-query";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(queryOptions.findAll());

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Home" />
      <Header />
      <Layout as="main">
        <Photos />
      </Layout>
      <Footer />
    </>
  );
};

export default Home;
