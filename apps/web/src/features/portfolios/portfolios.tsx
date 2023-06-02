import Link from "next/link";
import React from "react";

import { Button } from "../../components/button";
import EmptyState from "../../components/empty-state";
import Heading from "../../components/heading";
import routes from "../../config/routes";
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
      <div className="flex flex-col">
        <section
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
          aria-label="portfolio gallery"
        >
          {portfolios.map(({ id, slug, name, images }) => {
            const thumbnail = images[0];
            return (
              <Link key={id} href={routes.portfolio(slug)}>
                <ImageCaption
                  src={thumbnail.src}
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
          <Button
            variant="outline"
            className="mx-auto mt-10"
            onClick={() => fetchNextPage()}
          >
            Load More
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default Portfolios;
