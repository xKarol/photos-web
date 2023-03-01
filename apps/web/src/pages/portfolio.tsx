import type { NextPage } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { Header } from "../features/header";
import { Footer } from "../features/footer";
import { getPortfolios } from "../services/portfolios";
import Layout from "../components/layout";
import { Portfolios } from "../features/portfolios";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["portfolio"],
    queryFn: ({ pageParam = 1 }) => getPortfolios(pageParam),
    getNextPageParam: ({ nextPage }) => nextPage,
  });

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
      <Layout>
        <Portfolios />
      </Layout>
      <Footer />
    </>
  );
};

export default PortfolioPage;
