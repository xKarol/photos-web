import Link from "next/link";
import React from "react";
import Photo from "./photo";
import { usePhotos } from "../../hooks/usePhotos";

const Photos = () => {
  const { ref, data, fetchNextPage } = usePhotos();

  const photos = data?.pages.map(({ data }) => data).flat(1) || [];
  const half = photos.length / 2;

  return (
    <section className="container mx-auto">
      <div className="flex space-x-10">
        <div className="w-full flex flex-col space-y-10">
          {photos.slice(0, half).map(({ id, src, alt }: any) => (
            <Link href={`/photo/${id}`} key={id}>
              <Photo
                className="relative"
                src={src}
                alt={alt}
                width={400}
                height={300}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Link>
          ))}
        </div>
        <div className="w-full flex flex-col space-y-10">
          {photos.slice(half, photos.length).map(({ id, src, alt }: any) => (
            <Link href={`/photo/${id}`} key={id}>
              <Photo
                className="relative"
                src={src}
                alt={alt}
                width={700}
                height={475}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Link>
          ))}
        </div>
      </div>
      <button onClick={() => fetchNextPage()} ref={ref}>
        Load More
      </button>
    </section>
  );
};

export default Photos;
