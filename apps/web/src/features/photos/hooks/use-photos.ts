import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import type { Image, Pagination } from "types";
import { getPhotos } from "../../../services/photos";

const transformData = (data: InfiniteData<Pagination<Image[]>>) => {
  return data?.pages.flatMap(({ data }) => data) || [];
};

export const usePhotos = () => {
  const response = useInfiniteQuery({
    queryKey: ["photos"],
    queryFn: ({ pageParam = 1 }) => getPhotos(pageParam ?? 1),
    getNextPageParam: ({ nextPage }) => nextPage,
  });
  return { ...response, data: transformData(response.data) };
};
