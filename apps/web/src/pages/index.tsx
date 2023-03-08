import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Header } from "../features/header";
import { Footer } from "../features/footer";
import { Photos } from "../features/photos";
import { getPhotos } from "../services/photos";
import Layout from "../components/layout";
import { photoKeys } from "../features/photos/queries";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: photoKeys.all,
    queryFn: ({ pageParam = 1 }) => getPhotos(pageParam),
    getNextPageParam: ({ nextPage }) => nextPage,
  });

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
