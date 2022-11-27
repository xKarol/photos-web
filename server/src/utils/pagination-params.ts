import queryString from "query-string";

type PaginationParams = {
  page?: string;
  limit?: string;
};

export const paginationParams = (query: PaginationParams) => {
  const { page = 1, limit = 10 }: { limit?: number; page?: number } =
    queryString.parse(queryString.stringify(query), {
      parseNumbers: true,
    });

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit,
  };
};
