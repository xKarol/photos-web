export type Pagination<T> = {
  data: T;
  nextPage: number | undefined;
};

export type PaginationParams = {
  page: number;
  limit: number;
};

export type ServerPaginationParams = PaginationParams & {
  skip: number;
};
