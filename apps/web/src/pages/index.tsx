import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Header } from "../features/header";
import { Footer } from "../features/footer";
import { Photos } from "../features/photos";
import Layout from "../components/layout";
import { queryOptions } from "../features/photos/config/query-options";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(queryOptions.all);

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
      <Layout>
        <Photos />
      </Layout>
      <Footer />
    </>
  );
};

export default Home;
