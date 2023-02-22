import { useRouter } from "next/router";
import React from "react";
import EmptyState from "../../components/empty-state";
import Heading from "../../components/heading";
import ImagesList from "./components/images-list";
import usePortfolio from "./hooks/use-portfolio";

const PortfolioImages = () => {
  const router = useRouter();
  const slug = router.query.portfolioSlug as string;
  const { data, isError, isFetching, refetch } = usePortfolio(slug);
  const { name } = data || {};

  return (
    <>
      {isError ? (
        <EmptyState
          text="No images found"
          isLoading={isFetching}
          handleRefresh={refetch}
          showButton
        />
      ) : (
        <>
          <Heading className="mb-5">{name}</Heading>
          <ImagesList />
        </>
      )}
    </>
  );
};

export default PortfolioImages;
