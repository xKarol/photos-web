import Link from "next/link";
import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { getPhotos } from "../../services/photos";
import Photo from "./photo";

const Photos = () => {
  const { data, fetchNextPage } = useInfiniteQuery(
    "photos",
    ({ pageParam: page }) => getPhotos(page, 10),
    {
      getNextPageParam: (lastPage) => lastPage.page + 1 ?? undefined,
    }
  );
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

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
