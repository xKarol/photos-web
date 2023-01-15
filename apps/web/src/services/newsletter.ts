import axios from "axios";
import type { API } from "types";

const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const newsletterSubscribe = async (
  email: string
): Promise<API["Newsletter"]["Subscribe"]> => {
  return await axios.post(`${SERVER_URL}/newsletter/subscribe`, { email });
};
