import axios from "../libs/axios";
import type { API } from "types";

export const getPhotos = async (
  page = 1,
  limit = 10
): Promise<API["Photos"]["Get"]> => {
  const { data } = await axios.get(`/photos?page=${page}&limit=${limit}`);
  return data;
};

export const getPhoto = async (
  photoId: string
): Promise<API["Photos"]["GetOne"]> => {
  const { data } = await axios.get(`/photos/${photoId}`);
  return data;
};
