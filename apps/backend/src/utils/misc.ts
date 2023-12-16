import axios from "axios";

export function getPaginationData<T = unknown>(
  data: T[],
  params: { limit: number; page: number }
) {
  const { page, limit } = params;
  return {
    data: data.slice(0, limit),
    nextPage: data.length > limit ? page + 1 : undefined,
  };
}

export async function getBufferFromUrl(url: string): Promise<Buffer> {
  const { data: buffer } = await axios.get(url, {
    responseType: "arraybuffer",
  });
  return buffer;
}

export function getFileExtension(fileName: string) {
  return fileName.split(".").pop();
}
