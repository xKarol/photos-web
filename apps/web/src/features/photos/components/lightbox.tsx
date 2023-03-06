import React from "react";
import LightboxComponent from "../../../components/lightbox";
import { usePhotos } from "../hooks/use-photos";
import useLightbox from "../../../hooks/use-lightbox";

const Lightbox = () => {
  const { fetchNextPage, data: photos } = usePhotos();
  const { selectedIndex, handleClose } = useLightbox();

  if (selectedIndex)
    return (
      <LightboxComponent
        onClose={handleClose}
        initialIndex={selectedIndex - 1}
        isOpen={true}
        photos={photos}
        onClickNext={(currentIndex, lastIndex) => {
          if (lastIndex - currentIndex <= 1) fetchNextPage();
        }}
      />
    );
};

export default Lightbox;
