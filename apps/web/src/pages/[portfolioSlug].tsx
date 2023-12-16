import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";

import Layout from "../components/layout";
import { Footer } from "../features/footer";
import { Header } from "../features/header";
import { PortfolioImages } from "../features/portfolios";
import { queryOptions } from "../features/portfolios/config/react-query";
import usePortfolio from "../features/portfolios/hooks/use-portfolio";
import usePortfolioPage from "../features/portfolios/hooks/use-portfolio-page";
import { getPortfolios } from "../features/portfolios/services/portfolios";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await getPortfolios();
  const paths =
    data?.map((path) => ({ params: { portfolioSlug: path.slug } })) || [];
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();
  const slug = ctx.params?.portfolioSlug as string;
  try {
    await queryClient.fetchQuery(queryOptions.findOne(slug));
  } catch {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const PortfolioIndexPage: NextPage = () => {
  const { slug } = usePortfolioPage();
  const { data } = usePortfolio(slug);

  return (
    <>
      <NextSeo title={data.name} />
      <Header />
      <Layout as="main">
        <PortfolioImages />
      </Layout>
      <Footer />
    </>
  );
};

export default PortfolioIndexPage;
