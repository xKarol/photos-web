import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import type { API } from "@app/types";
import { queryOptions } from "../config/query-options";

const transformData = (data: InfiniteData<API["Photos"]["Get"]>) => {
  return data?.pages.flatMap(({ data }) => data) || [];
};

export const usePhotos = () => {
  const response = useInfiniteQuery(queryOptions.all);
  return { ...response, data: transformData(response.data) };
};
