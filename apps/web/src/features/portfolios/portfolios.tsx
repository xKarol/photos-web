import Link from "next/link";
import React from "react";
import EmptyState from "../../components/empty-state";
import Heading from "../../components/heading";
import ImageCaption from "./components/image-caption";
import usePortfolios from "./hooks/use-portfolios";

const Portfolios = () => {
  const {
    fetchNextPage,
    data: portfolios,
    hasNextPage,
    isFetching,
    refetch,
  } = usePortfolios();
  const isEmptyState = !portfolios?.[0]?.id;

  if (isEmptyState) {
    return (
      <EmptyState
        text="No portfolios found"
        isLoading={isFetching}
        handleRefresh={refetch}
        showButton
      />
    );
  }
  return (
    <>
      <Heading className="mb-5">Portfolios</Heading>
      <section
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
        aria-label="portfolio gallery"
      >
        {portfolios.map(({ id, slug, name, images }) => {
          const thumbnail = images[0];
          return (
            <Link key={id} href={`/${slug}`}>
              <ImageCaption
                id={thumbnail.id}
                className="h-[450px] w-full md:h-[250px]"
                caption={name}
                alt={thumbnail.alt}
                placeholder="blur"
                blurDataURL={thumbnail.placeholder}
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
