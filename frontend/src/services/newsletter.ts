import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const newsletterSubscribe = async (email: string) => {
  return axios.post(`${SERVER_URL}/newsletter/subscribe`, { email });
};