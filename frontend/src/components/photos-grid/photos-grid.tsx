import React, { useState } from "react";
import { usePhotos } from "../../hooks/usePhotos";
import Layout from "../layout";
import Lightbox from "../lightbox";
import Spinner from "../spinner";
import PhotosColumns from "./photos-columns";

const Photos = () => {
  const { ref, data, fetchNextPage, hasNextPage, isFetching } = usePhotos();
  const [open, setOpen] = useState(false);

  const photos = data?.pages.map(({ data }) => data).flat(1) || [];

  return (
    <>
      <Layout as="section" className="flex flex-col">
        <PhotosColumns onClick={() => setOpen(true)} photos={photos} />
        {hasNextPage ? (
          <div className="mt-[2.5rem] mx-auto">
            {isFetching ? (
              <Spinner color="black" />
            ) : (
              <button
                className=" border border-black py-2 px-4 text-sm"
                onClick={() => fetchNextPage()}
                ref={ref}
              >
                Load More
              </button>
            )}
          </div>
        ) : null}
      </Layout>

      <Lightbox setIsOpen={setOpen} isOpen={open} photos={photos} />
    </>
  );
};

export default Photos;
