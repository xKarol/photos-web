import React from "react";
import { usePhotos } from "./hooks/use-photos";
import Spinner from "../../components/spinner";
import PhotosColumns from "./components/photos-columns";
import EmptyState from "../../components/empty-state";
import Lightbox from "./components/lightbox";

const Photos = () => {
  const {
    ref,
    data: photos,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = usePhotos();
  const isEmptyState = !photos?.[0]?.id;

  return (
    <>
      <section className="flex flex-col">
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
              <div className="mx-auto mt-[2.5rem]">
                {isFetching ? (
                  <Spinner color="black" />
                ) : (
                  <button
                    className="btn"
                    onClick={() => fetchNextPage()}
                    ref={ref}
                  >
                    Load More
                  </button>
                )}
              </div>
            ) : null}
          </>
        )}
      </section>
      <Lightbox />
    </>
  );
};

export default Photos;
