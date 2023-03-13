import type { FetchInfiniteQueryOptions } from "@tanstack/react-query";
import type { API } from "types";
import { queryKeys } from "./query-keys";
import { getPhotos } from "../services/photos";

const portfoliosOptions: FetchInfiniteQueryOptions<API["Photos"]["Get"]> = {
  queryKey: queryKeys.all,
  queryFn: ({ pageParam = 1 }) => getPhotos(pageParam ?? 1, 5),
  getNextPageParam: ({ nextPage }) => nextPage,
};

export const queryOptions = {
  all: portfoliosOptions,
} satisfies Record<keyof typeof queryKeys, unknown>;
