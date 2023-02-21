import { useRouter } from "next/router";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { Lightbox as LightboxComponent } from "../../../components/lightbox";
import { getPhotos } from "../../../services/photos";

const Lightbox = () => {
  const { query, push } = useRouter();
  const selectedIndex = Number(query?.selected);

  const { fetchNextPage, data } = useInfiniteQuery(
    "photos",
    ({ pageParam: page = 1 }) => getPhotos(page, 10),
    {
      getNextPageParam: ({ nextPage }) => nextPage,
    }
  );

  const photos = data?.pages.flatMap(({ data }) => data) || [];

  if (selectedIndex)
    return (
      <LightboxComponent
        setIsOpen={() => push("/", undefined, { shallow: true })}
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
