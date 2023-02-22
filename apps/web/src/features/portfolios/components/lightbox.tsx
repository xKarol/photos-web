import { useRouter } from "next/router";
import React from "react";
import { Lightbox as LightboxComponent } from "../../../components/lightbox";
import usePortfolio from "../hooks/use-portfolio";
import usePortfolioPage from "../hooks/use-portfolio-page";

const Lightbox = () => {
  const router = useRouter();
  const { slug, selectedIndex } = usePortfolioPage();
  const { data } = usePortfolio(slug);

  const handleClose = () => {
    router.push({ query: { portfolioSlug: slug } }, undefined, {
      shallow: true,
    });
  };

  if (selectedIndex)
    return (
      <LightboxComponent
        initialIndex={selectedIndex - 1}
        photos={data.images}
        onClose={handleClose}
      />
    );
};

export default Lightbox;
