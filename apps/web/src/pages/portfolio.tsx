import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";

import Layout from "../components/layout";
import { Footer } from "../features/footer";
import { Header } from "../features/header";
import { Portfolios } from "../features/portfolios";
import { queryOptions } from "../features/portfolios/config/query-options";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(queryOptions.all);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

const PortfolioPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Portfolio" />
      <Header />
      <Layout as="main">
        <Portfolios />
      </Layout>
      <Footer />
    </>
  );
};

export default PortfolioPage;
