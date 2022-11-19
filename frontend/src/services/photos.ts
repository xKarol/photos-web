import axios from "axios";

const SERVER_URL = "http://localhost:4000";

export const getPhotos = async () => {
  return await axios.get(`${SERVER_URL}/photos`);
};
