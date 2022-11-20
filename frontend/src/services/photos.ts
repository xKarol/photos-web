import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getPhotos = async () => {
  return await axios.get(`${SERVER_URL}/photos`);
};
