import Link from "next/link";
import React from "react";
import { getImageUrl } from "../../utils/misc";
import { getImagePlaceholder } from "../../utils/placeholder";
import ImageCaption from "./components/image-caption";
import usePortfolios from "./hooks/use-portfolios";

const Portfolios = () => {
  const { fetchNextPage, data: portfolios, hasNextPage } = usePortfolios();
  return (
    <>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {portfolios.map(({ id, slug, name, images }) => {
          const thumbnail = images[0];
          return (
            <Link key={id} href={`/${slug}`}>
              <ImageCaption
                className=" h-[450px] w-full md:h-[250px]"
                caption={name}
                alt={thumbnail.alt}
                src={getImageUrl(thumbnail.id)}
                blurDataURL={getImagePlaceholder(thumbnail.id)}
              />
            </Link>
          );
        })}
      </section>
      {hasNextPage ? (
        <button onClick={() => fetchNextPage()}>Load More</button>
      ) : null}
    </>
  );
};

export default Portfolios;
