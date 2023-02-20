import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { getPhotos } from "../../../services/photos";

export const usePhotos = () => {
  const { fetchNextPage, ...response } = useInfiniteQuery(
    "photos",
    ({ pageParam: page = 1 }) => getPhotos(page ?? 1, 10),
    {
      getNextPageParam: ({ nextPage }) => nextPage,
    }
  );
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "-500px 0px 0px 0px",
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  const data = response.data?.pages.flatMap(({ data }) => data) || [];

  return { ref, fetchNextPage, ...response, data: data };
};
