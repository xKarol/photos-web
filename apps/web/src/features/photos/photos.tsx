import React from "react";
import { usePhotos } from "./hooks/use-photos";
import Spinner from "../../components/spinner";
import PhotosColumns from "./components/photos-columns";

const Photos = () => {
  const { ref, data, fetchNextPage, hasNextPage, isFetching } = usePhotos();

  const photos = data?.pages.flatMap(({ data }) => data) || [];
  return (
    <section className="flex flex-col">
      <PhotosColumns photos={photos} />
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
    </section>
  );
};

export default Photos;
