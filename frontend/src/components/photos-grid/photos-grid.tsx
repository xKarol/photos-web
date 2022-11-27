import React, { useState } from "react";
import { usePhotos } from "../../hooks/usePhotos";
import Lightbox from "../lightbox";
import PhotosColumns from "./photos-columns";

const Photos = () => {
  const { ref, data, fetchNextPage, hasNextPage } = usePhotos();
  const [open, setOpen] = useState(false);

  const photos = data?.pages.map(({ data }) => data).flat(1) || [];

  return (
    <>
      <section className="container mx-auto">
        <PhotosColumns onClick={() => setOpen(true)} photos={photos} />
        {hasNextPage ? (
          <button onClick={() => fetchNextPage()} ref={ref}>
            Load More
          </button>
        ) : null}
      </section>
      <Lightbox setIsOpen={setOpen} isOpen={open} photos={photos} />
    </>
  );
};

export default Photos;
