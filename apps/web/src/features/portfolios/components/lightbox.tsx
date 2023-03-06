import React from "react";
import LightboxComponent from "../../../components/lightbox";
import usePortfolio from "../hooks/use-portfolio";
import usePortfolioPage from "../hooks/use-portfolio-page";
import useLightbox from "../../../hooks/use-lightbox";

const Lightbox = () => {
  const { slug } = usePortfolioPage();
  const { data } = usePortfolio(slug);
  const { handleClose, selectedIndex } = useLightbox();

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
