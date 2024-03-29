import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";

import Layout from "../components/layout";
import { Footer } from "../features/footer";
import { Header } from "../features/header";
import { Portfolios } from "../features/portfolios";
import { queryOptions } from "../features/portfolios/config/react-query";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(queryOptions.findAll());

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

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
