import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { Header } from "../features/header";
import { Footer } from "../features/footer";
import Layout from "../components/layout";
import { getPortfolio, getPortfolios } from "../services/portfolios";
import Photo from "../features/photos/components/photo";
import { getImageUrl } from "../utils/misc";
import { Lightbox } from "../components/lightbox";
import { getErrorMessage } from "../utils/get-error-message";
import Heading from "../components/heading";
import { getImagePlaceholder } from "../utils/placeholder";
import usePortfolio from "../features/portfolios/hooks/use-portfolio";

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
    await queryClient.fetchQuery(["portfolio", slug], () => getPortfolio(slug));
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
  const router = useRouter();
  const slug = router.query.portfolioSlug as string;
  const { data, error, isError } = usePortfolio(slug);
  const selected = Number(router.query.selected);
  const { name, images = [] } = data || {};
  console.log(router);
  return (
    <>
      <NextSeo title={name} />
      <Header />
      <Layout>
        <Heading className="mb-5">{name}</Heading>
        {isError ? <span>{getErrorMessage(error)}</span> : null}
        <section className="flex flex-col gap-10">
          {images.map(({ id, alt, height, width }, index) => (
            <Link
              key={id}
              href={{
                query: { ...router.query, selected: index + 1 },
              }}
              shallow
            >
              <Photo
                alt={alt}
                src={getImageUrl(id)}
                height={height}
                width={width}
                blurDataURL={getImagePlaceholder(id)}
                style={{
                  width: "100%",
                  maxHeight: "1200px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            </Link>
          ))}
        </section>
      </Layout>
      {selected ? (
        <Lightbox
          initialIndex={selected - 1}
          photos={images}
          onClose={() =>
            router.push(
              {
                query: { portfolioSlug: router.query.portfolioSlug },
              },
              undefined,
              { shallow: true }
            )
          }
        />
      ) : null}
      <Footer />
    </>
  );
};

export default PortfolioIndexPage;
