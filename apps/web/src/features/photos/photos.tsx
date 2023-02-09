import React from "react";
import { usePhotos } from "./hooks/use-photos";
import Spinner from "../../components/spinner";
import PhotosColumns from "./components/photos-columns";

const Photos = () => {
  const { ref, data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    usePhotos();

  const photos = data?.pages.flatMap(({ data }) => data) || [];
  return (
    <section className="flex flex-col">
      {isLoading ? null : <PhotosColumns photos={photos} />}
      {hasNextPage ? (
        <div className="mx-auto mt-[2.5rem]">
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
    </section>
  );
};

export default Photos;
