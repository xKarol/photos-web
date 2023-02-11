import type { API } from "types";
import axios from "../libs/axios";

export const getAboutImage = async (): Promise<API["About"]["Get"]> => {
  const { data } = await axios.get(`/about/image`);
  return data;
};
