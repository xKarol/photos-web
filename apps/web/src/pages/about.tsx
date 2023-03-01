import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { Header } from "../features/header";
import { Footer } from "../features/footer";
import Layout from "../components/layout";
import Heading from "../components/heading";
import aboutImg from "../../public/assets/about.jpg";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="About" />
      <Header />
      <Layout as="main">
        <div className="flex space-x-10">
          <figure className="flex-1">
            <Image
              src={aboutImg}
              alt="about image"
              width={600}
              height={500}
              style={{ objectFit: "cover" }}
              className="max-h-[500px] w-full"
            />
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
