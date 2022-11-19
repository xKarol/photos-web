import axios from "axios";

const SERVER_URL = "http://localhost:4000";

export const newsletterSubscribe = async (email: string) => {
  return axios.post(`${SERVER_URL}/newsletter/subscribe`, { email });
};
