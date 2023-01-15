import axios from "axios";
import type { API } from "types";

const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAboutImage = async (): Promise<API["About"]["Get"]> => {
  const { data } = await axios.get(`${SERVER_URL}/about/image`);
  return data;
};
