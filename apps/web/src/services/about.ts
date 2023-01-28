import axios from "../libs/axios";
import type { API } from "types";

export const getAboutImage = async (): Promise<API["About"]["Get"]> => {
  const { data } = await axios.get(`/about/image`);
  return data;
};
