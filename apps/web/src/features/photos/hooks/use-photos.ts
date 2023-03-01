import { useInfiniteQuery } from "@tanstack/react-query";
import { getPhotos } from "../../../services/photos";

export const usePhotos = () => {
  const response = useInfiniteQuery({
    queryKey: ["photos"],
    queryFn: ({ pageParam = 1 }) => getPhotos(pageParam),
    getNextPageParam: ({ nextPage }) => nextPage,
  });
  const data = response.data?.pages.flatMap(({ data }) => data) || [];

  return { ...response, data: data };
};
