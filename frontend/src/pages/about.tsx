import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../features/header/header";
import { Footer } from "../features/footer/footer";
import Layout from "../components/layout";
import Image from "next/image";
import { useQuery } from "react-query";
import { getAboutImage } from "../services/about";
import { getImageUrl } from "../utils/misc";

const Home: NextPage = () => {
  const { data: image, isLoading } = useQuery("about", getAboutImage);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Layout as="main">
        <div className="flex space-x-10">
          <figure className="flex-1">
            {isLoading ? null : (
              <Image
                src={getImageUrl(image?.id || "")}
                alt={image?.alt || ""}
                placeholder="blur"
                blurDataURL={image?.placeholder}
                width={image?.width}
                height={image?.height}
                style={{ objectFit: "cover" }}
                className="outline-dotted w-full max-h-[600px]"
              />
            )}
          </figure>
          <section className="flex-1 flex flex-col">
            <h1 className="uppercase text-bold text-3xl mb-5">About</h1>
            <p className="mb-3 tracking-wide font-light text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem sit adipisci officia culpa fugiat, explicabo optio
              dolorem doloremque possimus consequatur delectus amet suscipit qui
              nisi quia numquam, earum quam labore ipsam quas. At rem reiciendis
              sequi ipsa dolor facilis. Voluptates velit ab quas ipsa hic
              provident voluptatum. Nam, inventore tempore.
            </p>
            <p className="mb-3 tracking-wide font-light text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem sit adipisci officia culpa fugiat, explicabo optio
              dolorem doloremque possimus consequatur delectus amet suscipit qui
              nisi quia numquam.
            </p>
          </section>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default Home;
