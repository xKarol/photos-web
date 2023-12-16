import type { Photo } from "@app/types";

import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { queryOptions } from "../config/react-query";

const transformData = (data: InfiniteData<Photo.ApiResponse["findAll"]>) => {
  return data?.pages.flatMap(({ data }) => data) || [];
};

export const usePhotos = (...args: Parameters<typeof queryOptions.findAll>) => {
  const response = useInfiniteQuery(queryOptions.findAll(...args));
  return { ...response, data: transformData(response.data) };
};
