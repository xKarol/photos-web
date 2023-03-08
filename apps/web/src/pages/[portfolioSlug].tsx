import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { Header } from "../features/header";
import { Footer } from "../features/footer";
import Layout from "../components/layout";
import { getPortfolio, getPortfolios } from "../services/portfolios";
import usePortfolio from "../features/portfolios/hooks/use-portfolio";
import { PortfolioImages } from "../features/portfolios";
import usePortfolioPage from "../features/portfolios/hooks/use-portfolio-page";
import { portfolioKeys } from "../features/portfolios/queries";

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
    await queryClient.fetchQuery(portfolioKeys.one(slug), () =>
      getPortfolio(slug)
    );
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
      <Layout>
        <PortfolioImages />
      </Layout>
      <Footer />
    </>
  );
};

export default PortfolioIndexPage;
