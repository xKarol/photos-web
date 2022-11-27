import Link from "next/link";
import React, { useState } from "react";
import Photo from "./photo";
import { usePhotos } from "../../hooks/usePhotos";
import Lightbox from "../lightbox";

const Photos = () => {
  const { ref, data, fetchNextPage } = usePhotos();
  const [open, setOpen] = useState(false);

  const photos = data?.pages.map(({ data }) => data).flat(1) || [];
  const half = photos.length / 2;

  return (
    <>
      <section className="container mx-auto">
        <div className="flex space-x-10">
          <div className="w-full flex flex-col space-y-10">
            {photos
              .slice(0, half)
              .map(({ id, src, alt, width, height, placeholder }: any) => (
                // <Link href={`/photo/${id}`} key={id}>
                <Photo
                  onClick={() => setOpen(true)}
                  className="relative"
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  blurDataURL={placeholder}
                  placeholder="blur"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
                // </Link>
              ))}
          </div>
          <div className="w-full flex flex-col space-y-10">
            {photos
              .slice(half, photos.length)
              .map(({ id, src, alt, height, width, placeholder }: any) => (
                // <Link href={`/photo/${id}`} key={id}>
                <Photo
                  onClick={() => setOpen(true)}
                  className="relative"
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  blurDataURL={placeholder}
                  placeholder="blur"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
                // </Link>
              ))}
          </div>
        </div>
        <button onClick={() => fetchNextPage()} ref={ref}>
          Load More
        </button>
      </section>
      <Lightbox setIsOpen={setOpen} isOpen={open} photos={photos} />
    </>
  );
};

export default Photos;
