import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getPhotos = async (page = 0, limit = 10) => {
  return await axios.get(`${SERVER_URL}/photos?page=${page}&limit=${limit}`);
};
