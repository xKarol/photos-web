import React from "react";
import EmptyState from "../../components/empty-state";
import Heading from "../../components/heading";
import ImagesList from "./components/images-list";
import usePortfolio from "./hooks/use-portfolio";
import usePortfolioPage from "./hooks/use-portfolio-page";

const PortfolioImages = () => {
  const { slug } = usePortfolioPage();
  const { data, isError, isFetching, refetch } = usePortfolio(slug);

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
          <Heading className="mb-5">{data.name}</Heading>
          <ImagesList />
        </>
      )}
    </>
  );
};

export default PortfolioImages;
