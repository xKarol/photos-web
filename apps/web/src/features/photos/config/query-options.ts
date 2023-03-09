import type { FetchInfiniteQueryOptions } from "@tanstack/react-query";
import type { API } from "types";
import { photoKeys } from "./query-keys";
import { getPhotos } from "../../../services/photos";

const portfoliosOptions: FetchInfiniteQueryOptions<API["Photos"]["Get"]> = {
  queryKey: photoKeys.all,
  queryFn: ({ pageParam = 1 }) => getPhotos(pageParam ?? 1),
  getNextPageParam: ({ nextPage }) => nextPage,
};

export const queryOptions = {
  all: portfoliosOptions,
};
