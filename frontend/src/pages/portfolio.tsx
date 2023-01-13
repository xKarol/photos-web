import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../features/header";
import { Footer } from "../features/footer";
import { dehydrate, QueryClient } from "react-query";
import { getPortfolios } from "../services/portfolios";
import Layout from "../components/layout";
import { Portfolios } from "../features/portfolios";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    "portfolio",
    ({ pageParam: page = 1 }) => getPortfolios(page),
    {
      getNextPageParam: ({ nextPage }) => nextPage,
    }
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

const PortfolioPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout>
        <h1>Portfolios</h1>
        <Portfolios />
      </Layout>
      <Footer />
    </>
  );
};

export default PortfolioPage;
