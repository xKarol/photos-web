import { useRouter } from "next/router";
import React from "react";
import LightboxComponent from "../../../components/lightbox";
import { usePhotos } from "../hooks/use-photos";

const Lightbox = () => {
  const { query, push } = useRouter();
  const { fetchNextPage, data: photos } = usePhotos();
  const selectedIndex = Number(query?.selected);

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
