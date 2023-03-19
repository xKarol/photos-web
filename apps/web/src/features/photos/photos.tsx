import React from "react";
import Spinner from "../../components/spinner";
import PhotosColumns from "./components/photos-columns";
import EmptyState from "../../components/empty-state";
import { usePhotosRef } from "./hooks/use-photos-ref";
import useLightbox from "../../hooks/use-lightbox";

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
                  <button className="btn" onClick={() => fetchNextPage()}>
                    Load More
                  </button>
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
