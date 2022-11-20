import axios from "axios";
import type { PhotoType } from "../@types/photos";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type PhotosType = {
  data: PhotoType[];
  page: number;
  limit: number;
};

export const getPhotos = async (page = 0, limit = 10): Promise<PhotosType> => {
  const { data } = await axios.get(
    `${SERVER_URL}/photos?page=${page}&limit=${limit}`
  );
  return data;
};
