import React from "react";

import { Button } from "../../components/button";
import EmptyState from "../../components/empty-state";
import Spinner from "../../components/spinner";
import useLightbox from "../../hooks/use-lightbox";
import PhotosColumns from "./components/photos-columns";
import { usePhotosRef } from "./hooks/use-photos-ref";

const Photos = () => {
  const {
    ref,
    data: photos,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = usePhotosRef();
  const { Lightbox } = useLightbox();
  const isEmptyState = !photos?.[0]?.id;

  return (
    <>
      <section className="flex flex-col" aria-label="images gallery">
        {isEmptyState ? (
          <EmptyState
            text="No images found"
            isLoading={isFetching}
            handleRefresh={refetch}
            showButton
          />
        ) : (
          <>
            {isLoading ? null : <PhotosColumns photos={photos} />}
            {hasNextPage ? (
              <div className="mx-auto mt-[2.5rem]" ref={ref}>
                {isFetching ? (
                  <Spinner color="black" />
                ) : (
                  <Button variant="outline" onClick={() => fetchNextPage()}>
                    Load More
                  </Button>
                )}
              </div>
            ) : null}
          </>
        )}
      </section>

      <Lightbox
        photos={photos}
        onClickNext={(currentIndex, lastIndex) => {
          if (lastIndex - currentIndex <= 1) fetchNextPage();
        }}
      />
    </>
  );
};

export default Photos;
