import axios from "axios";
import { PhotoType } from "../@types/photos";

const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAboutImage = async (): Promise<PhotoType> => {
  const { data } = await axios.get(`${SERVER_URL}/about/image`);
  return data;
};
