import type { UseInfiniteQueryOptions } from "@tanstack/react-query";

import { getPhotos } from "../services/photos";

export const queryKeys = {
  findAll: ["photos"] as const,
};

export const queryOptions = {
  findAll: (
    options?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPhotos>>>
  ): UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPhotos>>> => ({
    ...options,
    queryKey: queryKeys.findAll,
    queryFn: ({ pageParam = 1 }) => getPhotos(pageParam ?? 1, 5),
    getNextPageParam: ({ nextPage }) => nextPage,
  }),
} satisfies Record<keyof typeof queryKeys, unknown>;
