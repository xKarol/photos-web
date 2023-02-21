import { useInfiniteQuery } from "react-query";
import { getPhotos } from "../../../services/photos";

export const usePhotos = () => {
  const response = useInfiniteQuery(
    "photos",
    ({ pageParam: page = 1 }) => getPhotos(page ?? 1, 10),
    {
      getNextPageParam: ({ nextPage }) => nextPage,
    }
  );
  const data = response.data?.pages.flatMap(({ data }) => data) || [];

  return { ...response, data: data };
};
