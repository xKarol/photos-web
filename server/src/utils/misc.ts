import axios from "axios";

export function getPaginationNextPage(
  items: unknown[],
  limit: number,
  page: number
) {
  const hasMore = items.length - 1 === limit;
  const nextPage = hasMore ? page + 1 : undefined;
  return nextPage;
}

export async function getBufferFromUrl(url: string) {
  const { data: buffer } = await axios.get(url, {
    responseType: "arraybuffer",
  });
  return buffer;
}
