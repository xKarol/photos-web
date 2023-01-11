import axios from "axios";
import queryString from "query-string";

export function getPaginationNextPage(
  items: unknown[],
  limit: number,
  page: number
): number | undefined {
  const hasMore = items.length - 1 === limit;
  const nextPage = hasMore ? page + 1 : undefined;
  return nextPage;
}

export function paginationParams(query: { page?: string; limit?: string }) {
  const { page = 1, limit = 10 }: { limit?: number; page?: number } =
    queryString.parse(queryString.stringify(query), {
      parseNumbers: true,
    });

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit + 1,
  };
}

export async function getBufferFromUrl(url: string) {
  const { data: buffer } = await axios.get(url, {
    responseType: "arraybuffer",
  });
  return buffer;
}
