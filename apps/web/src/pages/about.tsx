import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../features/header";
import { Footer } from "../features/footer";
import Layout from "../components/layout";
import { getAboutImage } from "../services/about";
import { getImageUrl } from "../utils/misc";
import Heading from "../components/heading";
import { getImagePlaceholder } from "../utils/placeholder";

const Home: NextPage = () => {
  const { data: image, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: getAboutImage,
  });
  return (
    <>
      <NextSeo title="About" />
      <Header />
      <Layout as="main">
        <div className="flex space-x-10">
          <figure className="flex-1">
            {isLoading ? null : (
              <Image
                src={getImageUrl(image.id)}
                alt={image.alt}
                placeholder="blur"
                blurDataURL={getImagePlaceholder(image.id)}
                width={image.width}
                height={image.height}
                style={{ objectFit: "cover" }}
                className="max-h-[600px] w-full outline-dotted"
              />
            )}
          </figure>
          <section className="flex flex-1 flex-col">
            <Heading className="mb-5">About</Heading>
            <p className="mb-3 text-xl font-light tracking-wide">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem sit adipisci officia culpa fugiat, explicabo optio
              dolorem doloremque possimus consequatur delectus amet suscipit qui
              nisi quia numquam, earum quam labore ipsam quas. At rem reiciendis
              sequi ipsa dolor facilis. Voluptates velit ab quas ipsa hic
              provident voluptatum. Nam, inventore tempore.
            </p>
            <p className="mb-3 text-xl font-light tracking-wide">
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
