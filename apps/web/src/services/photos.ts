import axios from "axios";
import type { API } from "types";

const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getPhotos = async (
  page = 1,
  limit = 10
): Promise<API["Photos"]["Get"]> => {
  const { data } = await axios.get(
    `${SERVER_URL}/photos?page=${page}&limit=${limit}`
  );
  return data;
};

export const getPhoto = async (
  photoId: string
): Promise<API["Photos"]["GetOne"]> => {
  const { data } = await axios.get(`${SERVER_URL}/photos/${photoId}`);
  return data;
};
